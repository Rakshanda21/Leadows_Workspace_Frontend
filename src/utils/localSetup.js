const localAppServerList = {
    processconsole: {
        PORT: 8000,
        domain: "processconsole",
    },
    botconsole: {
        PORT: 9003,
        domain: "botconsole",
    },
    whatsapp: {
        PORT: 9002,
        domain: "whatsapp.registry1.com",
    },
    billing: {
        PORT: 9004,
        domain: "billing.registry1.com",
    },
    integrations: {
        PORT: 11000,
        domain: "integrations.registry1.com",
    },
    bots: {
        PORT: 9009,
        domain: "bots.registry1.com",
    },
};

export const appServerPortNumberMapping = appKeyName => {
    if (!appKeyName) {
        return null;
    }

    if (localAppServerList.hasOwnProperty(appKeyName)) {
        return localAppServerList[appKeyName];
    }

    return null;
};
