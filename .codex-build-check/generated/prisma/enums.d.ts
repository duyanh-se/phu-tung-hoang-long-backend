export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const ContactRequestStatus: {
    readonly NEW: "NEW";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly RESOLVED: "RESOLVED";
};
export type ContactRequestStatus = (typeof ContactRequestStatus)[keyof typeof ContactRequestStatus];
