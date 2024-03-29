export const cardIconStyle = (card, userType) => {
    let icon = 'ant-design:warning-filled';
    if (card === 1) {
        switch (userType) {
            case 'Farmer':
                icon = 'ant-design:gold-outlined';
                break;
            case 'Buyer':
                icon = 'ant-design:gold-outlined';
                break;
            case 'Officer':
                icon = 'ant-design:team-outlined';
                break;
            case 'Seller':
                icon = 'ant-design:code-sandbox-outlined';
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
                icon = 'ant-design:team-outlined';
                break;
            case 'Officer':
                icon = 'ant-design:reconciliation-outlined';
                break;
            case 'Seller':
                icon = 'ant-design:shop-filled';
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
                icon = 'ant-design:check-circle-filled';
                break;
            case 'Officer':
                icon = 'ant-design:account-book-outlined';
                break;
            case 'Seller':
                icon = 'ant-design:tag-filled';
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
                icon = 'ant-design:tag-filled';
                break;
            case 'Officer':
                icon = 'ant-design:code-sandbox-outlined';
                break;
            case 'Seller':
                icon = 'ant-design:warning-outlined';
                break;
            default:
                icon = 'ant-design:warning-filled';
        }
    }

    return icon;
};

export const sellerStat = () => {
    const stat =
        [
            { label: 'Crocodile Mammoty', value: 15 },
            { label: 'Rigid Type Tractor Cultivators', value: 10 },
            { label: 'Buy Singer Agro Pump', value: 12 },
            { label: 'Garden Sprayers', value: 20 },
            { label: 'Santilizer Spray Bottle', value: 50 },
            { label: 'Cinemon Cutting Knife', value: 40 },
            { label: 'Garden Tool Set 3PCS', value: 35 },
            { label: 'Garden Fork & Hand Trowel', value: 20 },
            { label: 'Stanley Straight Rake', value: 10 },
        ];
    return stat;
}

export const cardTitle = (card, userType) => {
    let title = 'N/A';
    if (card === 1) {
        switch (userType) {
            case 'Farmer':
                title = 'Total Crops';
                break;
            case 'Buyer':
                title = 'Total Crops';
                break;
            case 'Officer':
                title = 'Farmers';
                break;
            case 'Seller':
                title = 'Total Products';
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
                title = 'Total farmers';
                break;
            case 'Officer':
                title = 'Total Crops';
                break;
            case 'Seller':
                title = 'My Shop';
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
                title = 'Ready to sell';
                break;
            case 'Officer':
                title = 'Buyers';
                break;
            case 'Seller':
                title = 'Items Sold';
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
                title = 'Bids Placed';
                break;
            case 'Officer':
                title = 'Sellers';
                break;
            case 'Seller':
                title = 'Low Stock';
                break;
            default:
                title = 'N/A';
        }
    }

    return title;
};


