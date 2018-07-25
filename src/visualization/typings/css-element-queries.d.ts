declare module 'css-element-queries' {
    export class ResizeSensor {
        constructor(element: (Element | Element[]), callback: Function);
        detach(callback: Function): void;
    }
}