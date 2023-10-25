import {formatDate, formatDateTime} from "./formatDate";
import {parseISO} from "date-fns";

describe("#formatDate", () => {
    it("should format epoch as expected", () => {
        expect(formatDate(new Date(0))).toBe("Jan 1, 1970");
    });
    it("should format handle null", () => {
        expect(formatDate(null)).toBe("(no date)");
    });
    it("should format a date we have parsed", () => {
        const d = parseISO("2021-08-12");
        expect(formatDate(d)).toBe("Aug 12, 2021");
    });
});

describe("#formatDateTime", () => {
    it("should format epoch as expected", () => {
        expect(formatDateTime(new Date(0))).toBe("Jan 1, 1970 10:00:00");
    });
    it("should format handle null", () => {
        expect(formatDateTime(null)).toBe("(no datetime)");
    });
    it("should format a datetime we have parsed", () => {
        const d = parseISO("2021-08-12 10:00:00");
        expect(formatDateTime(d)).toBe("Aug 12, 2021 10:00:00");
    });
});
