import 'vue-router';
declare module 'vue-router' {
  interface Router {
    pushTopState: (
      to: RouteLocationRaw
    ) => Promise<NavigationFailure | void | undefined>;
    replaceTopState: (
      to: RouteLocationRaw
    ) => Promise<NavigationFailure | void | undefined>;
  }
}
