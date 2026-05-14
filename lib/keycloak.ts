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

    // Wrap the init method to prevent multiple calls
    const originalInit = keycloakInstance.init.bind(keycloakInstance);
    keycloakInstance.init = function(initOptions) {
      if (isInitialized || isInitializing) {
        console.log('Keycloak already initialized or initializing, skipping...');
        return Promise.resolve(isInitialized);
      }
      
      isInitializing = true;
      return originalInit(initOptions).then((authenticated) => {
        isInitializing = false;
        isInitialized = true;
        return authenticated;
      }).catch((error) => {
        isInitializing = false;
        throw error;
      });
    };
  }

  return keycloakInstance;
}

const keycloak = getKeycloakInstance();

export default keycloak;
