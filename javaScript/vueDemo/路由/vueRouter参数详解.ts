import Vue, { ComponentOptions, PluginFunction, AsyncComponent } from "vue";

type Component = ComponentOptions<Vue> | typeof Vue | AsyncComponent;
type Dictionary<T> = { [key: string]: T };

export type RouterMode = "hash" | "history" | "abstract";
export type RawLocation = string | Location;
export type RedirectOption = RawLocation | ((to: Route) => RawLocation);
export type NavigationGuard = (
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void
) => any

export declare class VueRouter {
    constructor (options?: RouterOptions);

    app: Vue;
    mode: RouterMode;
    currentRoute: Route;

    beforeEach (guard: NavigationGuard): Function;
    beforeResolve (guard: NavigationGuard): Function;
    afterEach (hook: (to: Route, from: Route) => any): Function;
    push (location: RawLocation, onComplete?: Function, onAbort?: Function): void;
    replace (location: RawLocation, onComplete?: Function, onAbort?: Function): void;
    go (n: number): void;
    back (): void;
    forward (): void;
    getMatchedComponents (to?: RawLocation | Route): Component[];
    onReady (cb: Function, errorCb?: Function): void;
    onError (cb: Function): void;
    addRoutes (routes: RouteConfig[]): void;
    resolve (to: RawLocation, current?: Route, append?: boolean): {
        location: Location;
        route: Route;
        href: string;
        // backwards compat
        normalizedTo: Location;
        resolved: Route;
    };

    static install: PluginFunction<never>;
}

type Position = { x: number, y: number };
type PositionResult = Position | { selector: string, offset?: Position } | void;

export interface RouterOptions {
    routes?: RouteConfig[];
    mode?: RouterMode;
    fallback?: boolean;
    base?: string;
    linkActiveClass?: string;
    linkExactActiveClass?: string;
    parseQuery?: (query: string) => Object;
    stringifyQuery?: (query: Object) => string;
    scrollBehavior?: (
        to: Route,
        from: Route,
        savedPosition: Position | void
    ) => PositionResult | Promise<PositionResult>;
}

type RoutePropsFunction = (route: Route) => Object;

export interface PathToRegexpOptions {
    sensitive?: boolean;
    strict?: boolean;
    end?: boolean;
}
// routes 配置类型定义
export interface RouteConfig {
    // router 地址
    path: string;
    //接口中定义不需要完全匹配的 可选属性
    name?: string;

    component?: Component;
    components?: Dictionary<Component>;
    redirect?: RedirectOption;
    alias?: string | string[];
    children?: RouteConfig[];
    // 可选属性 而且 定义的是任意类型的值
    meta?: any;
    beforeEnter?: NavigationGuard;
    props?: boolean | Object | RoutePropsFunction;
    caseSensitive?: boolean;
    pathToRegexpOptions?: PathToRegexpOptions;
}

export interface RouteRecord {
    path: string;
    regex: RegExp;
    components: Dictionary<Component>;
    instances: Dictionary<Vue>;
    name?: string;
    parent?: RouteRecord;
    redirect?: RedirectOption;
    matchAs?: string;
    meta: any;
    beforeEnter?: (
        route: Route,
        redirect: (location: RawLocation) => void,
        next: () => void
    ) => any;
    props: boolean | Object | RoutePropsFunction | Dictionary<boolean | Object | RoutePropsFunction>;
}

export interface Location {
    name?: string;
    path?: string;
    hash?: string;
    query?: Dictionary<string>;
    params?: Dictionary<string>;
    append?: boolean;
    replace?: boolean;
}

export interface Route {
    path: string;
    name?: string;
    hash: string;
    query: Dictionary<string>;
    params: Dictionary<string>;
    fullPath: string;
    matched: RouteRecord[];
    redirectedFrom?: string;
    meta?: any;
}
