import { AccountTree, Apps, AssignmentInd, DomainAdd, GroupAdd, Hail, MapsHomeWork } from "@mui/icons-material";
import BadgeIcon from '@mui/icons-material/Badge';

export const Org_Owner_NavBarOptions = [
    {
        name: "Users",
        iconProvider: "mui",
        icon: GroupAdd,
        route: "/users",
        defaultRoute: true,
    },
    {
        name: "Branches",
        iconProvider: "mui",
        icon: DomainAdd,
        route: "/branches",
        defaultRoute: true,
    },
    {
        name: "Departments",
        iconProvider: "mui",
        icon: MapsHomeWork,
        route: "/departments",
        defaultRoute: true,
    },
    {
        name: "Roles",
        iconProvider: "mui",
        icon: BadgeIcon,
        route: "/roles",
        defaultRoute: true,
    },
    {
        name: "Vendor",
        iconProvider: "mui",
        icon: Hail,
        route: "/vendor",
        defaultRoute: true,
    },
    {
        // name: "Configuration Page",
        iconProvider: "mui",
        // icon: AccountTree,
        route: "/validate",
        defaultRoute: false,
    },
];

export const NavbarForConsumerUnitUser = [
    {
        name: "Unit Login",
        iconProvider: "mui",
        icon: Apps,
        route: "/unit-login",
        defaultRoute: true,
    },
    // {
    //     name: "Audit logs",
    //     iconProvider: "mui",
    //     icon: WorkHistory,
    //     route: "/audit-log",
    // },
];

export const NavbarForMonitoringUnitUser = [
    {
        name: "Pyramid",
        iconProvider: "mui",
        icon: AccountTree,
        route: "/pyramid",
        defaultRoute: true,
    },
    {
        name: "Apps",
        iconProvider: "mui",
        icon: Apps,
        route: "/app-list",
        defaultRoute: true,
    },
    // {
    //     name: "Audit logs",
    //     iconProvider: "mui",
    //     icon: WorkHistory,
    //     route: "/audit-log",
    // },
];

export const SECONDARY_ERP_EXTERNAL_USER_NavBarOptions = [
    {
        name: "Secondary ERP User",
        iconProvider: "mui",
        icon: AccountTree,
        route: "/secondary-erp-user",
        defaultRoute: true,
    },
];
