import Keycloak from 'keycloak-js';

// Singleton pattern to prevent multiple initializations
let keycloakInstance: Keycloak | undefined;
let isInitializing = false;
let isInitialized = false;

function getKeycloakInstance(): Keycloak {
  if (typeof window === 'undefined') {
    // Return a dummy instance for SSR
    return {} as Keycloak;
  }

  if (!keycloakInstance) {
    keycloakInstance = new Keycloak({
      url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
      realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || 'justizia',
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || 'justizia-frontend',
    });

    // Wrap the init method to prevent multiple calls and restore tokens
    const originalInit = keycloakInstance.init.bind(keycloakInstance);
    keycloakInstance.init = function(initOptions) {
      if (isInitialized || isInitializing) {
        console.log('Keycloak already initialized or initializing, skipping...');
        return Promise.resolve(true);
      }
      
      isInitializing = true;
      
      // Restore tokens from localStorage if they exist (before init)
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('kc_token');
        const storedRefreshToken = localStorage.getItem('kc_refreshToken');
        const storedIdToken = localStorage.getItem('kc_idToken');

        if (storedToken && storedRefreshToken && storedIdToken) {
          console.log('Found tokens in localStorage, validating...');
          
          // Validate JWT format (must have 3 parts: header.payload.signature)
          const isValidJWT = (token: string) => {
            const parts = token.split('.');
            return parts.length === 3 && parts.every(part => part.length > 0);
          };

          if (isValidJWT(storedToken) && isValidJWT(storedRefreshToken) && isValidJWT(storedIdToken)) {
            try {
              console.log('Tokens are valid, restoring...');
              this.token = storedToken;
              this.refreshToken = storedRefreshToken;
              this.idToken = storedIdToken;
              this.tokenParsed = JSON.parse(atob(storedToken.split('.')[1]));
              this.authenticated = true;
              console.log('Tokens restored successfully');
              
              // Provide tokens to init
              initOptions = {
                ...initOptions,
                token: storedToken,
                refreshToken: storedRefreshToken,
                idToken: storedIdToken,
              };
            } catch (error) {
              console.error('Failed to parse/restore tokens:', error);
              // Clear invalid tokens
              localStorage.removeItem('kc_token');
              localStorage.removeItem('kc_refreshToken');
              localStorage.removeItem('kc_idToken');
            }
          } else {
            console.warn('Invalid JWT format in localStorage, clearing tokens');
            localStorage.removeItem('kc_token');
            localStorage.removeItem('kc_refreshToken');
            localStorage.removeItem('kc_idToken');
          }
        }
      }
      
      return originalInit(initOptions).then((authenticated) => {
        isInitializing = false;
        isInitialized = true;
        const isAuth = authenticated || this.authenticated || false;
        console.log('Keycloak initialized, authenticated:', isAuth);
        return isAuth;
      }).catch((error) => {
        isInitializing = false;
        console.error('Keycloak init error:', error);
        throw error;
      });
    };
  }

  return keycloakInstance;
}

const keycloak = getKeycloakInstance();

export default keycloak;
