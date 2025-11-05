import { WAIT_FOR_ELEMENT_DELAY } from "./config";
import { grades } from "./grades/grades";
import { hotkeys } from "./hotkeys/hotkeys";
import { debug, sleep } from "./utils";

declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Window {
        OCP_ran: boolean | undefined;
    }
}

const main = async (): Promise<void> => {
    debug("Main: running");

    if (globalThis.window.OCP_ran === true) {
        debug("Main: already ran, stopping");
        return;
    }
    globalThis.window.OCP_ran = true;

    // Check for jQuery
    while (typeof jQuery === "undefined") {
        debug("Main: waiting for jquery");
        await sleep(WAIT_FOR_ELEMENT_DELAY);
    }

    hotkeys();

    void grades();

    debug("Main: done");
};

void main();
