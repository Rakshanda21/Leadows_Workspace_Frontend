import { Org_Owner_NavBarOptions } from "./AllUnit_NavBarOptions";
import { PyramidUserRole } from "./UserRoles";

export const UnitType = {
    MONITORING_UNIT: "MONITORING_UNIT",
    CONSUMER_UNIT: "CONSUMER_UNIT",
};

export const isAccessible = (currentRoute, loggedInUser) => {
    if (currentRoute === "/") {
        return true;
    }
    if (!loggedInUser) {
        return false;
    }
    if (!loggedInUser.userRole) {
        return false;
    }
    switch (loggedInUser.userRole) {
        case PyramidUserRole.ORG_OWNER: {
            const defaultRouteNavItem = Org_Owner_NavBarOptions.find(navItem => navItem.route === currentRoute);
            if (defaultRouteNavItem && defaultRouteNavItem.route) {
                return true;
            } else {
                return false;
            }
        }

        default: {
            return [];
        }
    }
};

export const navListBasedOnUserType = loggedInUser => {
    if (!loggedInUser) {
        return [];
    }
    if (!loggedInUser.userRole) {
        return [];
    }

    switch (loggedInUser.userRole) {
        case PyramidUserRole.ORG_OWNER: {
            return Org_Owner_NavBarOptions;
        }

        // case PyramidUserRole.ORG_USER: {
        //     if (loggedInUser.unitType === UnitType.MONITORING_UNIT) {
        //         return NavbarForMonitoringUnitUser;
        //     } else {
        //         return NavbarForConsumerUnitUser;
        //     }
        // }

        default: {
            return [];
        }
    }
};

export const defaultRouteBasedOnUserType = (loggedInUser, defaultErrorRoute, defaultHomeRoute) => {
    if (!loggedInUser) {
        return defaultErrorRoute;
    }
    if (!loggedInUser.userRole) {
        return defaultErrorRoute;
    }
    switch (loggedInUser.userRole) {
        case PyramidUserRole.ORG_OWNER: {
            const defaultRouteNavItem = Org_Owner_NavBarOptions.find(navItem => navItem.defaultRoute === true);
            if (defaultRouteNavItem && defaultRouteNavItem.route) {
                return defaultRouteNavItem.route;
            } else {
                return defaultHomeRoute;
            }
        }

        default: {
            return [];
        }
    }
};
