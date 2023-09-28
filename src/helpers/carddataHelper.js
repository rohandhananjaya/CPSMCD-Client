export const cardIconStyle = (card, userType) => {
    let icon = 'ant-design:warning-filled';
    if (card === 1) {
        switch (userType) {
            case 'Farmer':
                icon = 'ant-design:team-outlined';
                break;
            case 'Buyer':
                icon = 'ant-design:apple-filled';
                break;
            case 'Officer':
                icon = 'ant-design:team-outlined';
                break;
            case 'Seller':
                icon = 'ant-design:user-outlined';
                break;
            default:
                icon = 'ant-design:warning-filled';
        }

    } else if (card === 2) {
        switch (userType) {
            case 'Farmer':
                icon = 'ant-design:home-outlined';
                break;
            case 'Buyer':
                icon = 'ant-design:apple-filled';
                break;
            case 'Officer':
                icon = 'ant-design:reconciliation-outlined';
                break;
            case 'Seller':
                icon = 'ant-design:user-outlined';
                break;
            default:
                icon = 'ant-design:warning-filled';
        }
    } else if (card === 3) {
        switch (userType) {
            case 'Farmer':
                icon = 'ant-design:check-circle-outlined';
                break;
            case 'Buyer':
                icon = 'ant-design:apple-filled';
                break;
            case 'Officer':
                icon = 'ant-design:schedule-filled';
                break;
            case 'Seller':
                icon = 'ant-design:user-outlined';
                break;
            default:
                icon = 'ant-design:warning-filled';
        }
    } else if (card === 4) {
        switch (userType) {
            case 'Farmer':
                icon = 'ant-design:clock-circle-outlined';
                break;
            case 'Buyer':
                icon = 'ant-design:apple-filled';
                break;
            case 'Officer':
                icon = 'ant-design:history-outlined';
                break;
            case 'Seller':
                icon = 'ant-design:user-outlined';
                break;
            default:
                icon = 'ant-design:warning-filled';
        }
    }

    return icon;
};

export const cardTitle = (card, userType) => {
    let title = 'N/A';
    if (card === 1) {
        switch (userType) {
            case 'Farmer':
                title = 'Total Crops';
                break;
            case 'Buyer':
                title = 'Total Orders';
                break;
            case 'Officer':
                title = 'Total Farmers';
                break;
            case 'Seller':
                title = 'Total Users';
                break;
            default:
                title = 'N/A';
        }
    } else if (card === 2) {
        switch (userType) {
            case 'Farmer':
                title = 'My Cultivations';
                break;
            case 'Buyer':
                title = 'Total Orders';
                break;
            case 'Officer':
                title = 'Total Crops';
                break;
            case 'Seller':
                title = 'Total Users';
                break;
            default:
                title = 'N/A';
        }
    } else if (card === 3) {
        switch (userType) {
            case 'Farmer':
                title = 'Ready to sell';
                break;
            case 'Buyer':
                title = 'Total Orders';
                break;
            case 'Officer':
                title = 'Completed';
                break;
            case 'Seller':
                title = 'Total Orders';
                break;
            default:
                title = 'N/A';
        }
    } else if (card === 4) {
        switch (userType) {
            case 'Farmer':
                title = 'In Progress';
                break;
            case 'Buyer':
                title = 'Total Orders';
                break;
            case 'Officer':
                title = 'Processing';
                break;
            case 'Seller':
                title = 'Total Orders';
                break;
            default:
                title = 'N/A';
        }
    }

    return title;
};
