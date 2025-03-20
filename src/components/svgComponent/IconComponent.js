import { useTheme } from "@emotion/react";
import React from "react";

export function ProcessIcon () {
    return <img src='/assets/pyramid_apis.svg' style={{ height: "30px" }} alt='' />;
}

export function BotsIcon () {
    return <img src='/assets/pyramid_bots.svg' style={{ height: "30px" }} alt='' />;
}

export function RcsIcon () {
    return <img src='/assets/pyramid_rcs.svg' style={{ height: "30px" }} alt='' />;
}

export function SmsIcon () {
    return <img src='/assets/pyramid_sms.svg' style={{ height: "30px" }} alt='' />;
}

export function WhatsAppIcon () {
    return <img src='/assets/pyramid_whatsapp.svg' style={{ height: "30px" }} alt='' />;
}

export function UsersIcon () {
    return <img src='/assets/pyramid_users.svg' style={{ height: "40px" }} alt='' />;
}
export function MonitoringUnitIcon () {
    return <img src='/assets/pyramid_monitoring_units.svg' style={{ height: "40px" }} alt='' />;
}
export function MonitoringUnitTableIcon () {
    return <img src='/assets/sidebarMonitoringUnits.svg' style={{ height: "1.5rem" }} alt='' />;
}
export function ConsumerUnitIcon ({ iconColor, isActive }) {
    const theme = useTheme();
    return (
        <svg
            viewBox='0 0 80 80'
            width='30'
            height='29'
            xmlns='http://www.w3.org/2000/svg'
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            // xml:space="preserve"
            overflow='hidden'
        >
            <g transform='translate(-245 -369)'>
                <path
                    d='M48.8031-33.4937 33.4937-48.8031 48.8031-64.1125 64.1125-48.8031 48.8031-33.4937ZM8.625-38.6688 8.625-60.3031 30.2594-60.3031 30.2594-38.6688 8.625-38.6688ZM38.6688-8.625 38.6688-30.2594 60.3031-30.2594 60.3031-8.625 38.6688-8.625ZM8.625-8.625 8.625-30.2594 30.2594-30.2594 30.2594-8.625 8.625-8.625ZM12.9375-42.9813 25.9469-42.9813 25.9469-55.9906 12.9375-55.9906 12.9375-42.9813ZM49.0187-39.3156 58.2906-48.5875 49.0187-57.8594 39.7469-48.5875 49.0187-39.3156ZM42.9813-12.9375 55.9906-12.9375 55.9906-25.9469 42.9813-25.9469 42.9813-12.9375ZM12.9375-12.9375 25.9469-12.9375 25.9469-25.9469 12.9375-25.9469 12.9375-12.9375Z'
                    fill={isActive ? iconColor : theme.palette.primary.inActive}
                    transform='matrix(1.01449 0 0 1 245 438)'
                />
            </g>
        </svg>
    );
}
export function UsersTableIcon ({ iconColor, isActive }) {
    const theme = useTheme();
    return (
        <svg
            viewBox='0 0 80 80'
            width='30'
            height='29'
            xmlns='http://www.w3.org/2000/svg'
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            // xml:space="preserve"
            overflow='hidden'
        >
            <g transform='translate(-248 -108)'>
                <path
                    d='M250.573 162.167 250.573 155.802C250.573 154.222 250.979 152.789 251.792 151.503 252.604 150.216 253.733 149.257 255.177 148.625 258.472 147.181 261.44 146.142 264.081 145.51 266.721 144.878 269.441 144.562 272.24 144.562 275.038 144.562 277.747 144.878 280.365 145.51 282.983 146.142 285.939 147.181 289.234 148.625 290.679 149.257 291.819 150.216 292.654 151.503 293.489 152.789 293.906 154.222 293.906 155.802L293.906 162.167 250.573 162.167ZM297.969 162.167 297.969 155.802C297.969 152.958 297.247 150.622 295.802 148.794 294.358 146.966 292.462 145.488 290.115 144.359 293.229 144.72 296.163 145.251 298.917 145.951 301.67 146.65 303.905 147.451 305.62 148.354 307.109 149.212 308.283 150.273 309.141 151.536 309.998 152.8 310.427 154.222 310.427 155.802L310.427 162.167 297.969 162.167ZM272.24 140.432C269.26 140.432 266.823 139.484 264.927 137.589 263.031 135.693 262.083 133.255 262.083 130.276 262.083 127.297 263.031 124.859 264.927 122.964 266.823 121.068 269.26 120.12 272.24 120.12 275.219 120.12 277.656 121.068 279.552 122.964 281.448 124.859 282.396 127.297 282.396 130.276 282.396 133.255 281.448 135.693 279.552 137.589 277.656 139.484 275.219 140.432 272.24 140.432ZM296.615 130.276C296.615 133.255 295.667 135.693 293.771 137.589 291.875 139.484 289.438 140.432 286.458 140.432 285.962 140.432 285.409 140.398 284.799 140.331 284.19 140.263 283.637 140.139 283.141 139.958 284.224 138.83 285.048 137.442 285.612 135.794 286.176 134.147 286.458 132.307 286.458 130.276 286.458 128.245 286.176 126.451 285.612 124.893 285.048 123.336 284.224 121.903 283.141 120.594 283.637 120.458 284.19 120.345 284.799 120.255 285.409 120.165 285.962 120.12 286.458 120.12 289.438 120.12 291.875 121.068 293.771 122.964 295.667 124.859 296.615 127.297 296.615 130.276ZM254.635 158.104 289.844 158.104 289.844 155.802C289.844 155.08 289.629 154.38 289.201 153.703 288.772 153.026 288.241 152.552 287.609 152.281 284.359 150.837 281.628 149.866 279.417 149.37 277.205 148.873 274.812 148.625 272.24 148.625 269.667 148.625 267.263 148.873 265.029 149.37 262.794 149.866 260.052 150.837 256.802 152.281 256.17 152.552 255.651 153.026 255.245 153.703 254.839 154.38 254.635 155.08 254.635 155.802L254.635 158.104ZM272.24 136.37C274 136.37 275.456 135.794 276.607 134.643 277.758 133.492 278.333 132.036 278.333 130.276 278.333 128.516 277.758 127.06 276.607 125.909 275.456 124.758 274 124.182 272.24 124.182 270.479 124.182 269.023 124.758 267.872 125.909 266.721 127.06 266.146 128.516 266.146 130.276 266.146 132.036 266.721 133.492 267.872 134.643 269.023 135.794 270.479 136.37 272.24 136.37Z'
                    fill={isActive ? iconColor : theme.palette.primary.inActive}
                />
            </g>
        </svg>
    );
}

export function PyramidAppsIcon () {
    return <img src='/assets/pyramid_apps.svg' style={{ height: "40px" }} alt='' />;
}

export function SecondaryERPIcon () {
    return <img src='/assets/pyramid_orgs.svg' style={{ height: "40px" }} alt='' />;
}

export function SideBarSecondaryERPIcon ({ iconColor, isActive }) {
    const theme = useTheme();
    return (
        <svg viewBox='0 0 80 80' width='30' height='29' xmlns='http://www.w3.org/2000/svg' overflow='hidden'>
            <g transform='translate(-245 -614)'>
                <path
                    d='M250.833 675.25 250.833 622.75 279.271 622.75 279.271 634.781 309.167 634.781 309.167 675.25 250.833 675.25ZM255.208 670.875 274.896 670.875 274.896 663.219 255.208 663.219 255.208 670.875ZM255.208 658.844 274.896 658.844 274.896 651.188 255.208 651.188 255.208 658.844ZM255.208 646.812 274.896 646.812 274.896 639.156 255.208 639.156 255.208 646.812ZM255.208 634.781 274.896 634.781 274.896 627.125 255.208 627.125 255.208 634.781ZM279.271 670.875 304.792 670.875 304.792 639.156 279.271 639.156 279.271 670.875ZM285.104 651.188 285.104 646.812 297.135 646.812 297.135 651.188 285.104 651.188ZM285.104 663.219 285.104 658.844 297.135 658.844 297.135 663.219 285.104 663.219Z'
                    fill={isActive ? iconColor : theme.palette.primary.inActive}
                />
            </g>
        </svg>
    );
}

export function RequestIcon () {
    return <img src='/assets/pyramid_requests.svg' style={{ height: "40px" }} alt='' />;
}

export function RequestTableIcon ({ iconColor, isActive }) {
    return (
        <svg
            viewBox='0 0 80 80'
            width='30'
            height='29'
            xmlns='http://www.w3.org/2000/svg'
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            // xml:space="preserve"
            overflow='hidden'
        >
            <g transform='translate(-49 -611)'>
                <path
                    d='M106.792 651.375 106.792 646.625 118.667 646.625 118.667 651.375 106.792 651.375ZM110.75 674.333 101.171 667.208 104.021 663.408 113.6 670.533 110.75 674.333ZM104.258 634.513 101.408 630.713 110.75 623.667 113.6 627.467 104.258 634.513ZM65.625 671.167 65.625 658.5 60.0833 658.5C58.7771 658.5 57.659 658.035 56.729 657.104 55.7986 656.174 55.3333 655.056 55.3333 653.75L55.3333 644.25C55.3333 642.944 55.7986 641.825 56.729 640.895 57.659 639.965 58.7771 639.5 60.0833 639.5L74.3333 639.5 90.1667 630 90.1667 668 74.3333 658.5 70.375 658.5 70.375 671.167 65.625 671.167ZM85.4167 659.608 85.4167 638.392 75.6 644.25 60.0833 644.25 60.0833 653.75 75.6 653.75 85.4167 659.608ZM93.3333 659.608 93.3333 638.392C94.7583 639.658 95.9062 641.202 96.7771 643.023 97.6479 644.844 98.0833 646.836 98.0833 649 98.0833 651.164 97.6479 653.156 96.7771 654.977 95.9062 656.798 94.7583 658.342 93.3333 659.608Z'
                    fill='#0066CC'
                />
            </g>
        </svg>
    );
}

export function SideBarUserIcons () {
    return <img src='/assets/addUsers.svg' style={{ height: "1.5rem" }} alt='' />;
}
export function BranchesIcon () {
    return <img src='/assets/branches.svg' style={{ height: "1.5rem" }} alt='' />;
}
export function DepartmentIcon () {
    return <img src='/assets/department.svg' style={{ height: "1.5rem" }} alt='' />;
}
export function SideBarSecondaryERPIcons () {
    return <img src='/assets/erps_sidebar.svg' style={{ height: "1.5rem" }} alt='' />;
}
export function SideBarRequestsIcons () {
    return <img src='/assets/requests_sidebar.svg' style={{ height: "1.5rem" }} alt='' />;
}

export function SideBarLandingPageIcons () {
    return <img src='/assets/landing_page_sidebar.svg' style={{ height: "1.5rem" }} alt='' />;
}
export function SideBarRegistryIcon () {
    return <img src='/assets/erps_sidebar.svg' style={{ height: "1.5rem" }} alt='' />;
}

export function SideBarOrgChartIcons () {
    return <img src='/assets/org_chart.svg' style={{ height: "1.5rem" }} alt='' />;
}

export function MonitoringUnitSidebarIcon () {
    return <img src='/assets/monitoring_units_sidebar.svg' style={{ height: "1.5rem" }} alt='' />;
}

export function AdsManagerIcon () {
    return <img src='/assets/ads_manager.svg' style={{ height: "30px" }} alt='' />;
}

export function BillingUnitIcon () {
    return <img src='/assets/billing_icon.svg' style={{ height: "1.5rem" }} alt='' />;
}

export function LiveAgentIcon () {
    return <img src='/assets/liveagent.svg' style={{ height: "30px" }} alt='' />;
}

export function RoleIcon () {
    return <img src='/assets/role.svg' style={{ height: "1.5rem" }} alt='' />;
}

export function VendorIcon () {
    return <img src='/assets/vendor.svg' style={{ height: "1.5rem" }} alt='' />;
}

export function AssetIcon () {
    return <img src='/assets/asset.svg' style={{ height: "1.5rem" }} alt='' />;
}

export function InventoryIcon () {
    return <img src='/assets/inventory.svg' style={{ height: "1.5rem" }} alt='' />;
}

export function CustomerIcon () {
    return <img src='/assets/customer.svg' style={{ height: "1.5rem" }} alt='' />;
}
