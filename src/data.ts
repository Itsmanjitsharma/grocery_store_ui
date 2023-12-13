export const adminMenu =[
    {
        id:1,
        title:"MAIN",
        listItems:[
            {
                id:1,
                title:"Dashboard",
                url:"/",
                path:"/Dashboard",
                icon:"home.svg",
            }
        ]
    },{
        id:2,
        title:"INVENTORY",
        listItems:[
            {
                id:1,
                title:"Inventory",
                url:"/Inventory",
                path:"/Inventory",
                icon:"home.svg",
            },{
                id:2,
                title:"Inventory Summery",
                url:"/InventorySummery",
                path:"/InventorySummery",
                icon:"home.svg",
            }
        ]
    },{
        id:3,
        title:"BILLING",
        listItems:[
            {
                id:1,
                title:"Billing Retail",
                url:"/BillingRetail",
                path:"/BillingRetail",
                icon:"home.svg",
            },{
                id:2,
                title:"Billing Wholesale",
                url:"/BillingWholesale",
                path:"/BillingWholesale",
                icon:"home.svg",
            },
            {
                id:3,
                title:"Billing History",
                url:"/BillingHistory",
                path:"/BillingHistory",
                icon:"home.svg",
            }
        ]
    },{
        id:4,
        title:"Customer",
        listItems:[
          {
              id:1,
              title:"Customer",
              url:"/Customer",
              path:"/Customer",
              icon:"home.svg",
          },{
              id:2,
              title:"Customer Info",
              url:"/CustomerInfo:customer_name",
              path:"/CustomerInfo:customer_name",
              icon:"home.svg",
          }
        ]
  },{
        id:5,
        title:"PRODUCT",
        listItems:[
            {
                id:1,
                title:"Product",
                url:"/product/:productId",
                path:"/product/:productId",
                icon:"home.svg",
            }
        ]
    },{
        id:5,
        title:"Admin",
        listItems:[
            {
                id:1,
                title:"Admin",
                url:"/admin",
                path:"/admin",
                icon:"home.svg",
            }
        ]
    },{
        id:6,
        title:"LOGOUT",
        listItems:[
            {
                id:1,
                title:"LOGOUT",
                url:"/Logout",
                path:"/Logout",
                icon:"home.svg",
            }
        ]
    }
]


export const serviceMenu =[
    {
        id:1,
        title:"BILLING",
        listItems:[
            {
                id:1,
                title:"Billing Retail",
                url:"/BillingRetail",
                path:"/BillingRetail",
                icon:"home.svg",
            },{
                id:2,
                title:"Billing Wholesale",
                url:"/BillingWholesale",
                path:"/BillingWholesale",
                icon:"home.svg",
            },
            {
                id:3,
                title:"Billing History",
                url:"/BillingHistory",
                path:"/BillingHistory",
                icon:"home.svg",
            }
        ]
    },{
          id:2,
          title:"Customer",
          listItems:[
            {
                id:1,
                title:"Customer",
                url:"/Customer",
                path:"/Customer",
                icon:"home.svg",
            },{
                id:2,
                title:"Customer Info",
                url:"/CustomerInfo:customer_name",
                path:"/CustomerInfo:customer_name",
                icon:"home.svg",
            }
          ]
    },
    {id:3,
        title:"Logout",
        listItems:[{
        id:1,
        title:"Logout",
        url:"/Logout",
        path:"/Logout",
        icon:"home.svg",
        }]
    }
]
export const API_BASE_URL = 'http://localhost:8080';

export const customerAddServiceUrl = `${API_BASE_URL}/api/customers/add`;
export const inventoryAddServiceUrl = `${API_BASE_URL}/addInventory`;
export const registorServiceUrl = `${API_BASE_URL}/registor`;
export const authenticateServiceUrl = `${API_BASE_URL}/authentication`;
export const billingInfoServiceUrl = `${API_BASE_URL}/getBillingInfo`;
export const dashboardDetailsUrl = `${API_BASE_URL}/dashboardDetails`;
export const getProductsServiceUrl = `${API_BASE_URL}/getProducts`;
export const billingServiceUrl = `${API_BASE_URL}/billing`;
export const getAllCustomerServiceUrl = `${API_BASE_URL}/api/customers/getAll`;
export const customerInfoServiceUrl = `${API_BASE_URL}/CustomerInfo/`;
export const productServiceUrl = `${API_BASE_URL}/product/`;
export const deleteRowServiceUrl = `${API_BASE_URL}/deleteRow/`;
export const updateRowServiceUrl = `${API_BASE_URL}/updateRow`;
export const inventoryInfoServiceUrl = `${API_BASE_URL}/getInventeryInfo`;
export const inventorySummeryInfo = `${API_BASE_URL}/getInventerySummeryInfo`;
export const getAdminUsersUrl = `${API_BASE_URL}/getAdminUsers`;
export const updateAdminUserUrl = `${API_BASE_URL}/getUpdateAdminUsers`;
export const deleteAdminUserUrl = `${API_BASE_URL}/deleteAdminUsers`;
export const addAdminUserUrl = `${API_BASE_URL}/addAdminUsers`;


