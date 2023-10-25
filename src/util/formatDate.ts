import {format} from "date-fns";

export const formatDate = (date: Date | null) => (
    (date) ? format(date, "PP") : "(no date)"
);

export const formatDateTime = (date: Date | null) => (
    (date) ? format(date, "PP HH:mm:ss") : "(no datetime)"
);