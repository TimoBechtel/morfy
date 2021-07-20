import type { PropertiesHyphen } from 'csstype';
declare type StyleProperties = {
    [key in keyof PropertiesHyphen<string>]: string;
};
export declare function createMorphable(source: HTMLElement, target: HTMLElement, { duration, timingFunction, effectedCssProperties, affectedCssProperties, }?: MorfyOptions): Morphable;
export declare function morph(source: HTMLElement, target: HTMLElement, options: MorfyOptions): void;
interface MorfyOptions {
    /**
     * duration in seconds
     */
    duration?: number;
    /**
     * css timing function
     * @example 'ease-in'
     */
    timingFunction?: PropertiesHyphen['transition-timing-function'];
    /**
     * @deprecated Will be removed in next major release. Use affectedCssProperties instead.
     */
    effectedCssProperties?: (keyof StyleProperties)[];
    /**
     * css properties to be transitioned from source to target
     */
    affectedCssProperties?: (keyof StyleProperties)[];
}
interface Morphable {
    /**
     * start morphing
     */
    morph: () => void;
    /**
     * morph to initial state
     */
    revert: () => void;
}
export {};
