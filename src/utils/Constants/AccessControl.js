export const Permissions = {
    Sidebar: {
        SignOut: 4,
        Dashboard: 8,
        Integrations: 16,
        Bots: 32,
        Process: 64,
        Users: 128,
        Settings: 256,
        Account: 512,
        Subscription: 1024,
        CompanyDetails: 2048,
        Team: 4096,
        Invoices: 8192,
        Logs: 16384,
        Reports: 32768,
        Cognitive: 65536,
        Broadcast: 131072,
        BroadcastReports: 262144,
        BusinessUnits: 1048576,
        WhatsAppFlows: 2097152,
        UrlShortnerReports: 4194304,
        Campaigns: 8388608,
        ProcessReports: 16777216,
        BotAttributeReports: 33554432,
    },
    Dashboard: {
        Onboarding: 4,
        BotTemplates: 8,
    },
    Integrations: {
        View: 4,
        Add: 8,
        Update: 16,
        Delete: 32,
        Copy: 64,
    },
    Bots: {
        View: 4,
        Add: 8,
        Update: 16,
        Delete: 32,
        AddIntegration: 64,
        DeleteIntegration: 128,
        TestBot: 256,
        DeployBot: 512,
        DraftBots: 1024,
    },
    Workflow: {
        View: 4,
        Add: 8,
        Update: 16,
        Delete: 32,
        TestWorkFlow: 64,
    },
    Users: {
        View: 4,
        Add: 8,
        Update: 16,
        Delete: 32,
        Import: 64,
        ImportHistory: 128,
        ViewChannels: 256,
        AddChannels: 512,
        UpdateChannels: 1024,
        DeleteChannels: 2048,
    },
    Team: {
        InviteMember: 4,
        EditOwner: 8,
        EditAdmin: 16,
        EditeEditor: 32,
        DeleteOwner: 64,
        DeleteAdmin: 128,
        DeleteEditor: 256,
        AssignBots: 512,
        ChangeRole: 1024,
    },
};

export const ModuleNames = {
    SidebarMenu: "sidebar-menu",
    Dashboard: "dashboard",
    Integrations: "integrations",
    Bots: "bots",
    Broadcast: "broadcast",
    Process: "process",
    Users: "users",
    Settings: "settings",
    Team: "team",
    BusinessUnits: "businessUnits",
    Activity: "activity",
    WhatsAppFlows: "whatsAppFlows",
    Campaigns: "campaigns",
};
