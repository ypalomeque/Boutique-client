export const navigations = [
  { name: "Usuarios", path: "/usuarios", icon: "group" },
  { name: "Pedidos", path: "/pedidos", icon: "real_estate_agent" },
  { name: "Ventas", path: "/ventas", icon: "point_of_sale" },
  {
    name: "Stock",
    icon: "inventory",
    children: [
      { name: "Producto", iconText: "SI", icon: 'post_add', path: "/productos" },
      { name: "Compras", iconText: "SU", icon: 'shopping_cart', path: "/session/signup" },
      { name: "Proveedores", iconText: "FP", icon: 'contact_phone', path: "/session/forgot-password" },
    ]
  },
  {
    name: "Notificaciones",
    icon: "calendar_month",
    children: [
      { name: "Servicios", iconText: "SI", icon: 'room_service', path: "/session/signin" },
      { name: "Citas", iconText: "SU", icon: 'edit_calendar', path: "/session/signup" },
    ]
  },
  {
    name: "Adminitración",
    icon: "shield_person",

    children: [
      { name: "Movimientos", iconText: "SI", icon: 'currency_exchange', path: "/session/signin" },
      { name: "Ver Compras", iconText: "SU", icon: 'receipt_long', path: "/session/signup" },
    ]
  },
  {
    name: "Encomiendas",
    icon: "local_shipping",
    children: [
      { name: "Domicilios", iconText: "SI", icon: 'electric_moped', path: "/session/signin" },
      { name: "Pagos Domiciliarios", iconText: "SU", icon: 'monetization_on', path: "/session/signup" },
    ]
  },
  {
    name: "Configuraciones",
    icon: "engineering",
    children: [
      {
        name: "Categorías", icon: 'border_color', path: "/session/signin",
        children: [
          { name: "Categorías Para Producto", iconText: "SI", icon: 'post_add', path: "/categoria/productos", },
          { name: "Categorías Para Servicios", iconText: "SI", icon: 'post_add', path: "/categoria/servicios", }
        ]
      },
      { name: "Accesos", iconText: "SU", icon: 'manage_accounts', path: "/session/signup" },
      { name: "Salir", iconText: "SU", icon: 'logout', path: "/session/signup" },
    ]
  },
  //{ name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  //{ label: "PAGES", type: "label" },
  // {
  //   name: "Session/Auth",
  //   icon: "security",
  //   children: [
  //     { name: "Sign in", iconText: "SI", path: "/session/signin" },
  //     { name: "Sign up", iconText: "SU", path: "/session/signup" },
  //     { name: "Forgot Password", iconText: "FP", path: "/session/forgot-password" },
  //     { name: "Error", iconText: "404", path: "/session/404" }
  //   ]
  // },
  /*{ label: "Components", type: "label" },
  {
    name: "Components",
    icon: "favorite",
    badge: { value: "30+", color: "secondary" },
    children: [
      { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
      { name: "Buttons", path: "/material/buttons", iconText: "B" },
      { name: "Checkbox", path: "/material/checkbox", iconText: "C" },
      { name: "Dialog", path: "/material/dialog", iconText: "D" },
      { name: "Expansion Panel", path: "/material/expansion-panel", iconText: "E" },
      { name: "Form", path: "/material/form", iconText: "F" },
      { name: "Icons", path: "/material/icons", iconText: "I" },
      { name: "Menu", path: "/material/menu", iconText: "M" },
      { name: "Progress", path: "/material/progress", iconText: "P" },
      { name: "Radio", path: "/material/radio", iconText: "R" },
      { name: "Switch", path: "/material/switch", iconText: "S" },
      { name: "Slider", path: "/material/slider", iconText: "S" },
      { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
      { name: "Table", path: "/material/table", iconText: "T" }
    ]
  },*/
];
