import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly ContactRequest: "ContactRequest";
    readonly User: "User";
    readonly Session: "Session";
    readonly Manufacturer: "Manufacturer";
    readonly Product: "Product";
    readonly Category: "Category";
    readonly ProductCategory: "ProductCategory";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const ContactRequestScalarFieldEnum: {
    readonly id: "id";
    readonly fullName: "fullName";
    readonly email: "email";
    readonly phoneNumber: "phoneNumber";
    readonly reason: "reason";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ContactRequestScalarFieldEnum = (typeof ContactRequestScalarFieldEnum)[keyof typeof ContactRequestScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly fullName: "fullName";
    readonly role: "role";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly refreshTokenHash: "refreshTokenHash";
    readonly expiresAt: "expiresAt";
    readonly revokedAt: "revokedAt";
    readonly createdAt: "createdAt";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const ManufacturerScalarFieldEnum: {
    readonly id: "id";
    readonly legacyId: "legacyId";
    readonly name: "name";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ManufacturerScalarFieldEnum = (typeof ManufacturerScalarFieldEnum)[keyof typeof ManufacturerScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly legacyId: "legacyId";
    readonly code: "code";
    readonly name: "name";
    readonly description: "description";
    readonly price: "price";
    readonly currency: "currency";
    readonly imagePath: "imagePath";
    readonly sourceManufacturerId: "sourceManufacturerId";
    readonly manufacturerId: "manufacturerId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const ProductCategoryScalarFieldEnum: {
    readonly productId: "productId";
    readonly categoryId: "categoryId";
};
export type ProductCategoryScalarFieldEnum = (typeof ProductCategoryScalarFieldEnum)[keyof typeof ProductCategoryScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
