import "@testing-library/jest-dom";
import ResizeObserver from "resize-observer-polyfill";
import { JSDOM } from "jsdom";
import { vi } from "vitest";

const { window } = new JSDOM();

// ResizeObserver mock
vi.stubGlobal("ResizeObserver", ResizeObserver);
window["ResizeObserver"] = ResizeObserver;

// IntersectionObserver mock
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock as any);
window["IntersectionObserver"] = IntersectionObserverMock;

// Override globalThis
Object.assign(global, { window, document: window.document });
