import { AccountTree, Apps, DomainAdd, GroupAdd, Hail, MapsHomeWork, WebAsset } from "@mui/icons-material";
import BadgeIcon from "@mui/icons-material/Badge";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Groups2Icon from '@mui/icons-material/Groups2';

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
        name: "Permissions",
        iconProvider: "mui",
        icon: Groups2Icon,
        route: "/permissions",
        defaultRoute: true,
    },
    {
        name: "Suppliers",
        iconProvider: "mui",
        icon: Hail,
        route: "/vendor",
        defaultRoute: true,
    },
    {
        name: "Assets",
        iconProvider: "mui",
        icon: WebAsset,
        route: "/assets",
        defaultRoute: true,
    },
    {
        name: "Inventory",
        iconProvider: "mui",
        icon: Inventory2Icon,
        route: "/inventory",
        defaultRoute: true,
    },
    {
        name: "Customers",
        iconProvider: "mui",
        icon: Groups2Icon,
        route: "/customers",
        defaultRoute: true,
    },
    {
        name: "Leaves",
        iconProvider: "mui",
        icon: Groups2Icon,
        route: "/leaves",
        defaultRoute: true,
    },
    {
        name: "Salaries",
        iconProvider: "mui",
        icon: Groups2Icon,
        route: "/salaries",
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
