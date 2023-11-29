
// NextJS Requirement
export const isWindowAvailable = () => typeof window !== "undefined";

export const findCurrentRoute = (routes) => {
  const foundRoute = routes.find(
    (route) =>
      isWindowAvailable() &&
      window.location.href.indexOf(route.layout + route.path) !== -1 &&
      route
  );

  return foundRoute;
};

export const getActiveRoute = (routes) => {
  const route = findCurrentRoute(routes);
  return route?.name || "Textify OCR";
};

export const getActiveNavbar = (routes) => {
  const route = findCurrentRoute(routes);
  return route?.secondary;
};

export const getActiveNavbarText = (routes) => {
  return getActiveRoute(routes) || false;
};
