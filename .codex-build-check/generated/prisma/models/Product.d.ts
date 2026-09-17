import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ProductModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductPayload>;
export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
};
export type ProductAvgAggregateOutputType = {
    legacyId: number | null;
    price: runtime.Decimal | null;
    sourceManufacturerId: number | null;
};
export type ProductSumAggregateOutputType = {
    legacyId: number | null;
    price: runtime.Decimal | null;
    sourceManufacturerId: number | null;
};
export type ProductMinAggregateOutputType = {
    id: string | null;
    legacyId: number | null;
    code: string | null;
    name: string | null;
    description: string | null;
    price: runtime.Decimal | null;
    currency: string | null;
    imagePath: string | null;
    sourceManufacturerId: number | null;
    manufacturerId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type ProductMaxAggregateOutputType = {
    id: string | null;
    legacyId: number | null;
    code: string | null;
    name: string | null;
    description: string | null;
    price: runtime.Decimal | null;
    currency: string | null;
    imagePath: string | null;
    sourceManufacturerId: number | null;
    manufacturerId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type ProductCountAggregateOutputType = {
    id: number;
    legacyId: number;
    code: number;
    name: number;
    description: number;
    price: number;
    currency: number;
    imagePath: number;
    sourceManufacturerId: number;
    manufacturerId: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type ProductAvgAggregateInputType = {
    legacyId?: true;
    price?: true;
    sourceManufacturerId?: true;
};
export type ProductSumAggregateInputType = {
    legacyId?: true;
    price?: true;
    sourceManufacturerId?: true;
};
export type ProductMinAggregateInputType = {
    id?: true;
    legacyId?: true;
    code?: true;
    name?: true;
    description?: true;
    price?: true;
    currency?: true;
    imagePath?: true;
    sourceManufacturerId?: true;
    manufacturerId?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type ProductMaxAggregateInputType = {
    id?: true;
    legacyId?: true;
    code?: true;
    name?: true;
    description?: true;
    price?: true;
    currency?: true;
    imagePath?: true;
    sourceManufacturerId?: true;
    manufacturerId?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type ProductCountAggregateInputType = {
    id?: true;
    legacyId?: true;
    code?: true;
    name?: true;
    description?: true;
    price?: true;
    currency?: true;
    imagePath?: true;
    sourceManufacturerId?: true;
    manufacturerId?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type ProductAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductCountAggregateInputType;
    _avg?: ProductAvgAggregateInputType;
    _sum?: ProductSumAggregateInputType;
    _min?: ProductMinAggregateInputType;
    _max?: ProductMaxAggregateInputType;
};
export type GetProductAggregateType<T extends ProductAggregateArgs> = {
    [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProduct[P]> : Prisma.GetScalarType<T[P], AggregateProduct[P]>;
};
export type ProductGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithAggregationInput | Prisma.ProductOrderByWithAggregationInput[];
    by: Prisma.ProductScalarFieldEnum[] | Prisma.ProductScalarFieldEnum;
    having?: Prisma.ProductScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductCountAggregateInputType | true;
    _avg?: ProductAvgAggregateInputType;
    _sum?: ProductSumAggregateInputType;
    _min?: ProductMinAggregateInputType;
    _max?: ProductMaxAggregateInputType;
};
export type ProductGroupByOutputType = {
    id: string;
    legacyId: number | null;
    code: string;
    name: string | null;
    description: string | null;
    price: runtime.Decimal | null;
    currency: string;
    imagePath: string | null;
    sourceManufacturerId: number | null;
    manufacturerId: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
};
export type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductGroupByOutputType[P]>;
}>>;
export type ProductWhereInput = {
    AND?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    OR?: Prisma.ProductWhereInput[];
    NOT?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    id?: Prisma.UuidFilter<"Product"> | string;
    legacyId?: Prisma.IntNullableFilter<"Product"> | number | null;
    code?: Prisma.StringFilter<"Product"> | string;
    name?: Prisma.StringNullableFilter<"Product"> | string | null;
    description?: Prisma.StringNullableFilter<"Product"> | string | null;
    price?: Prisma.DecimalNullableFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: Prisma.StringFilter<"Product"> | string;
    imagePath?: Prisma.StringNullableFilter<"Product"> | string | null;
    sourceManufacturerId?: Prisma.IntNullableFilter<"Product"> | number | null;
    manufacturerId?: Prisma.UuidNullableFilter<"Product"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Product"> | Date | string | null;
    manufacturer?: Prisma.XOR<Prisma.ManufacturerNullableScalarRelationFilter, Prisma.ManufacturerWhereInput> | null;
    categories?: Prisma.ProductCategoryListRelationFilter;
};
export type ProductOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    legacyId?: Prisma.SortOrderInput | Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    price?: Prisma.SortOrderInput | Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    imagePath?: Prisma.SortOrderInput | Prisma.SortOrder;
    sourceManufacturerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    manufacturerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    manufacturer?: Prisma.ManufacturerOrderByWithRelationInput;
    categories?: Prisma.ProductCategoryOrderByRelationAggregateInput;
};
export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    legacyId?: number;
    code?: string;
    AND?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    OR?: Prisma.ProductWhereInput[];
    NOT?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    name?: Prisma.StringNullableFilter<"Product"> | string | null;
    description?: Prisma.StringNullableFilter<"Product"> | string | null;
    price?: Prisma.DecimalNullableFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: Prisma.StringFilter<"Product"> | string;
    imagePath?: Prisma.StringNullableFilter<"Product"> | string | null;
    sourceManufacturerId?: Prisma.IntNullableFilter<"Product"> | number | null;
    manufacturerId?: Prisma.UuidNullableFilter<"Product"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Product"> | Date | string | null;
    manufacturer?: Prisma.XOR<Prisma.ManufacturerNullableScalarRelationFilter, Prisma.ManufacturerWhereInput> | null;
    categories?: Prisma.ProductCategoryListRelationFilter;
}, "id" | "legacyId" | "code">;
export type ProductOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    legacyId?: Prisma.SortOrderInput | Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    price?: Prisma.SortOrderInput | Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    imagePath?: Prisma.SortOrderInput | Prisma.SortOrder;
    sourceManufacturerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    manufacturerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ProductCountOrderByAggregateInput;
    _avg?: Prisma.ProductAvgOrderByAggregateInput;
    _max?: Prisma.ProductMaxOrderByAggregateInput;
    _min?: Prisma.ProductMinOrderByAggregateInput;
    _sum?: Prisma.ProductSumOrderByAggregateInput;
};
export type ProductScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductScalarWhereWithAggregatesInput | Prisma.ProductScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductScalarWhereWithAggregatesInput | Prisma.ProductScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Product"> | string;
    legacyId?: Prisma.IntNullableWithAggregatesFilter<"Product"> | number | null;
    code?: Prisma.StringWithAggregatesFilter<"Product"> | string;
    name?: Prisma.StringNullableWithAggregatesFilter<"Product"> | string | null;
    description?: Prisma.StringNullableWithAggregatesFilter<"Product"> | string | null;
    price?: Prisma.DecimalNullableWithAggregatesFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: Prisma.StringWithAggregatesFilter<"Product"> | string;
    imagePath?: Prisma.StringNullableWithAggregatesFilter<"Product"> | string | null;
    sourceManufacturerId?: Prisma.IntNullableWithAggregatesFilter<"Product"> | number | null;
    manufacturerId?: Prisma.UuidNullableWithAggregatesFilter<"Product"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Product"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Product"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Product"> | Date | string | null;
};
export type ProductCreateInput = {
    id?: string;
    legacyId?: number | null;
    code: string;
    name?: string | null;
    description?: string | null;
    price?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: string;
    imagePath?: string | null;
    sourceManufacturerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutProductsInput;
    categories?: Prisma.ProductCategoryCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateInput = {
    id?: string;
    legacyId?: number | null;
    code: string;
    name?: string | null;
    description?: string | null;
    price?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: string;
    imagePath?: string | null;
    sourceManufacturerId?: number | null;
    manufacturerId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    categories?: Prisma.ProductCategoryUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legacyId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    imagePath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceManufacturerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutProductsNestedInput;
    categories?: Prisma.ProductCategoryUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legacyId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    imagePath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceManufacturerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    manufacturerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    categories?: Prisma.ProductCategoryUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateManyInput = {
    id?: string;
    legacyId?: number | null;
    code: string;
    name?: string | null;
    description?: string | null;
    price?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: string;
    imagePath?: string | null;
    sourceManufacturerId?: number | null;
    manufacturerId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type ProductUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legacyId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    imagePath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceManufacturerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProductUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legacyId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    imagePath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceManufacturerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    manufacturerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProductListRelationFilter = {
    every?: Prisma.ProductWhereInput;
    some?: Prisma.ProductWhereInput;
    none?: Prisma.ProductWhereInput;
};
export type ProductOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    legacyId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    imagePath?: Prisma.SortOrder;
    sourceManufacturerId?: Prisma.SortOrder;
    manufacturerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type ProductAvgOrderByAggregateInput = {
    legacyId?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    sourceManufacturerId?: Prisma.SortOrder;
};
export type ProductMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    legacyId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    imagePath?: Prisma.SortOrder;
    sourceManufacturerId?: Prisma.SortOrder;
    manufacturerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type ProductMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    legacyId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    imagePath?: Prisma.SortOrder;
    sourceManufacturerId?: Prisma.SortOrder;
    manufacturerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type ProductSumOrderByAggregateInput = {
    legacyId?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    sourceManufacturerId?: Prisma.SortOrder;
};
export type ProductScalarRelationFilter = {
    is?: Prisma.ProductWhereInput;
    isNot?: Prisma.ProductWhereInput;
};
export type ProductCreateNestedManyWithoutManufacturerInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutManufacturerInput, Prisma.ProductUncheckedCreateWithoutManufacturerInput> | Prisma.ProductCreateWithoutManufacturerInput[] | Prisma.ProductUncheckedCreateWithoutManufacturerInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutManufacturerInput | Prisma.ProductCreateOrConnectWithoutManufacturerInput[];
    createMany?: Prisma.ProductCreateManyManufacturerInputEnvelope;
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
};
export type ProductUncheckedCreateNestedManyWithoutManufacturerInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutManufacturerInput, Prisma.ProductUncheckedCreateWithoutManufacturerInput> | Prisma.ProductCreateWithoutManufacturerInput[] | Prisma.ProductUncheckedCreateWithoutManufacturerInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutManufacturerInput | Prisma.ProductCreateOrConnectWithoutManufacturerInput[];
    createMany?: Prisma.ProductCreateManyManufacturerInputEnvelope;
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
};
export type ProductUpdateManyWithoutManufacturerNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutManufacturerInput, Prisma.ProductUncheckedCreateWithoutManufacturerInput> | Prisma.ProductCreateWithoutManufacturerInput[] | Prisma.ProductUncheckedCreateWithoutManufacturerInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutManufacturerInput | Prisma.ProductCreateOrConnectWithoutManufacturerInput[];
    upsert?: Prisma.ProductUpsertWithWhereUniqueWithoutManufacturerInput | Prisma.ProductUpsertWithWhereUniqueWithoutManufacturerInput[];
    createMany?: Prisma.ProductCreateManyManufacturerInputEnvelope;
    set?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    disconnect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    delete?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    update?: Prisma.ProductUpdateWithWhereUniqueWithoutManufacturerInput | Prisma.ProductUpdateWithWhereUniqueWithoutManufacturerInput[];
    updateMany?: Prisma.ProductUpdateManyWithWhereWithoutManufacturerInput | Prisma.ProductUpdateManyWithWhereWithoutManufacturerInput[];
    deleteMany?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
};
export type ProductUncheckedUpdateManyWithoutManufacturerNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutManufacturerInput, Prisma.ProductUncheckedCreateWithoutManufacturerInput> | Prisma.ProductCreateWithoutManufacturerInput[] | Prisma.ProductUncheckedCreateWithoutManufacturerInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutManufacturerInput | Prisma.ProductCreateOrConnectWithoutManufacturerInput[];
    upsert?: Prisma.ProductUpsertWithWhereUniqueWithoutManufacturerInput | Prisma.ProductUpsertWithWhereUniqueWithoutManufacturerInput[];
    createMany?: Prisma.ProductCreateManyManufacturerInputEnvelope;
    set?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    disconnect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    delete?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    update?: Prisma.ProductUpdateWithWhereUniqueWithoutManufacturerInput | Prisma.ProductUpdateWithWhereUniqueWithoutManufacturerInput[];
    updateMany?: Prisma.ProductUpdateManyWithWhereWithoutManufacturerInput | Prisma.ProductUpdateManyWithWhereWithoutManufacturerInput[];
    deleteMany?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type ProductCreateNestedOneWithoutCategoriesInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutCategoriesInput, Prisma.ProductUncheckedCreateWithoutCategoriesInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutCategoriesInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutCategoriesInput, Prisma.ProductUncheckedCreateWithoutCategoriesInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutCategoriesInput;
    upsert?: Prisma.ProductUpsertWithoutCategoriesInput;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutCategoriesInput, Prisma.ProductUpdateWithoutCategoriesInput>, Prisma.ProductUncheckedUpdateWithoutCategoriesInput>;
};
export type ProductCreateWithoutManufacturerInput = {
    id?: string;
    legacyId?: number | null;
    code: string;
    name?: string | null;
    description?: string | null;
    price?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: string;
    imagePath?: string | null;
    sourceManufacturerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    categories?: Prisma.ProductCategoryCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutManufacturerInput = {
    id?: string;
    legacyId?: number | null;
    code: string;
    name?: string | null;
    description?: string | null;
    price?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: string;
    imagePath?: string | null;
    sourceManufacturerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    categories?: Prisma.ProductCategoryUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutManufacturerInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutManufacturerInput, Prisma.ProductUncheckedCreateWithoutManufacturerInput>;
};
export type ProductCreateManyManufacturerInputEnvelope = {
    data: Prisma.ProductCreateManyManufacturerInput | Prisma.ProductCreateManyManufacturerInput[];
    skipDuplicates?: boolean;
};
export type ProductUpsertWithWhereUniqueWithoutManufacturerInput = {
    where: Prisma.ProductWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductUpdateWithoutManufacturerInput, Prisma.ProductUncheckedUpdateWithoutManufacturerInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutManufacturerInput, Prisma.ProductUncheckedCreateWithoutManufacturerInput>;
};
export type ProductUpdateWithWhereUniqueWithoutManufacturerInput = {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutManufacturerInput, Prisma.ProductUncheckedUpdateWithoutManufacturerInput>;
};
export type ProductUpdateManyWithWhereWithoutManufacturerInput = {
    where: Prisma.ProductScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateManyMutationInput, Prisma.ProductUncheckedUpdateManyWithoutManufacturerInput>;
};
export type ProductScalarWhereInput = {
    AND?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
    OR?: Prisma.ProductScalarWhereInput[];
    NOT?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
    id?: Prisma.UuidFilter<"Product"> | string;
    legacyId?: Prisma.IntNullableFilter<"Product"> | number | null;
    code?: Prisma.StringFilter<"Product"> | string;
    name?: Prisma.StringNullableFilter<"Product"> | string | null;
    description?: Prisma.StringNullableFilter<"Product"> | string | null;
    price?: Prisma.DecimalNullableFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: Prisma.StringFilter<"Product"> | string;
    imagePath?: Prisma.StringNullableFilter<"Product"> | string | null;
    sourceManufacturerId?: Prisma.IntNullableFilter<"Product"> | number | null;
    manufacturerId?: Prisma.UuidNullableFilter<"Product"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Product"> | Date | string | null;
};
export type ProductCreateWithoutCategoriesInput = {
    id?: string;
    legacyId?: number | null;
    code: string;
    name?: string | null;
    description?: string | null;
    price?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: string;
    imagePath?: string | null;
    sourceManufacturerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    manufacturer?: Prisma.ManufacturerCreateNestedOneWithoutProductsInput;
};
export type ProductUncheckedCreateWithoutCategoriesInput = {
    id?: string;
    legacyId?: number | null;
    code: string;
    name?: string | null;
    description?: string | null;
    price?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: string;
    imagePath?: string | null;
    sourceManufacturerId?: number | null;
    manufacturerId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type ProductCreateOrConnectWithoutCategoriesInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutCategoriesInput, Prisma.ProductUncheckedCreateWithoutCategoriesInput>;
};
export type ProductUpsertWithoutCategoriesInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutCategoriesInput, Prisma.ProductUncheckedUpdateWithoutCategoriesInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutCategoriesInput, Prisma.ProductUncheckedCreateWithoutCategoriesInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutCategoriesInput, Prisma.ProductUncheckedUpdateWithoutCategoriesInput>;
};
export type ProductUpdateWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legacyId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    imagePath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceManufacturerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    manufacturer?: Prisma.ManufacturerUpdateOneWithoutProductsNestedInput;
};
export type ProductUncheckedUpdateWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legacyId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    imagePath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceManufacturerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    manufacturerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProductCreateManyManufacturerInput = {
    id?: string;
    legacyId?: number | null;
    code: string;
    name?: string | null;
    description?: string | null;
    price?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: string;
    imagePath?: string | null;
    sourceManufacturerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type ProductUpdateWithoutManufacturerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legacyId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    imagePath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceManufacturerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    categories?: Prisma.ProductCategoryUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutManufacturerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legacyId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    imagePath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceManufacturerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    categories?: Prisma.ProductCategoryUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateManyWithoutManufacturerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legacyId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    imagePath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceManufacturerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProductCountOutputType = {
    categories: number;
};
export type ProductCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    categories?: boolean | ProductCountOutputTypeCountCategoriesArgs;
};
export type ProductCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductCountOutputTypeSelect<ExtArgs> | null;
};
export type ProductCountOutputTypeCountCategoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductCategoryWhereInput;
};
export type ProductSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    legacyId?: boolean;
    code?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    currency?: boolean;
    imagePath?: boolean;
    sourceManufacturerId?: boolean;
    manufacturerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    manufacturer?: boolean | Prisma.Product$manufacturerArgs<ExtArgs>;
    categories?: boolean | Prisma.Product$categoriesArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["product"]>;
export type ProductSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    legacyId?: boolean;
    code?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    currency?: boolean;
    imagePath?: boolean;
    sourceManufacturerId?: boolean;
    manufacturerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    manufacturer?: boolean | Prisma.Product$manufacturerArgs<ExtArgs>;
}, ExtArgs["result"]["product"]>;
export type ProductSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    legacyId?: boolean;
    code?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    currency?: boolean;
    imagePath?: boolean;
    sourceManufacturerId?: boolean;
    manufacturerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    manufacturer?: boolean | Prisma.Product$manufacturerArgs<ExtArgs>;
}, ExtArgs["result"]["product"]>;
export type ProductSelectScalar = {
    id?: boolean;
    legacyId?: boolean;
    code?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    currency?: boolean;
    imagePath?: boolean;
    sourceManufacturerId?: boolean;
    manufacturerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type ProductOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "legacyId" | "code" | "name" | "description" | "price" | "currency" | "imagePath" | "sourceManufacturerId" | "manufacturerId" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["product"]>;
export type ProductInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturer?: boolean | Prisma.Product$manufacturerArgs<ExtArgs>;
    categories?: boolean | Prisma.Product$categoriesArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProductIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturer?: boolean | Prisma.Product$manufacturerArgs<ExtArgs>;
};
export type ProductIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturer?: boolean | Prisma.Product$manufacturerArgs<ExtArgs>;
};
export type $ProductPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Product";
    objects: {
        manufacturer: Prisma.$ManufacturerPayload<ExtArgs> | null;
        categories: Prisma.$ProductCategoryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        legacyId: number | null;
        code: string;
        name: string | null;
        description: string | null;
        price: runtime.Decimal | null;
        currency: string;
        imagePath: string | null;
        sourceManufacturerId: number | null;
        manufacturerId: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["product"]>;
    composites: {};
};
export type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductPayload, S>;
export type ProductCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductCountAggregateInputType | true;
};
export interface ProductDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Product'];
        meta: {
            name: 'Product';
        };
    };
    findUnique<T extends ProductFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductFindManyArgs>(args?: Prisma.SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductCreateArgs>(args: Prisma.SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductDeleteArgs>(args: Prisma.SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductUpdateArgs>(args: Prisma.SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductUpsertArgs>(args: Prisma.SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductCountArgs>(args?: Prisma.Subset<T, ProductCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductCountAggregateOutputType> : number>;
    aggregate<T extends ProductAggregateArgs>(args: Prisma.Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>;
    groupBy<T extends ProductGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductFieldRefs;
}
export interface Prisma__ProductClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    manufacturer<T extends Prisma.Product$manufacturerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$manufacturerArgs<ExtArgs>>): Prisma.Prisma__ManufacturerClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    categories<T extends Prisma.Product$categoriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductFieldRefs {
    readonly id: Prisma.FieldRef<"Product", 'String'>;
    readonly legacyId: Prisma.FieldRef<"Product", 'Int'>;
    readonly code: Prisma.FieldRef<"Product", 'String'>;
    readonly name: Prisma.FieldRef<"Product", 'String'>;
    readonly description: Prisma.FieldRef<"Product", 'String'>;
    readonly price: Prisma.FieldRef<"Product", 'Decimal'>;
    readonly currency: Prisma.FieldRef<"Product", 'String'>;
    readonly imagePath: Prisma.FieldRef<"Product", 'String'>;
    readonly sourceManufacturerId: Prisma.FieldRef<"Product", 'Int'>;
    readonly manufacturerId: Prisma.FieldRef<"Product", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Product", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Product", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"Product", 'DateTime'>;
}
export type ProductFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type ProductFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type ProductFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type ProductCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductCreateInput, Prisma.ProductUncheckedCreateInput>;
};
export type ProductCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductCreateManyInput | Prisma.ProductCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    data: Prisma.ProductCreateManyInput | Prisma.ProductCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductUpdateInput, Prisma.ProductUncheckedUpdateInput>;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductUpdateManyMutationInput, Prisma.ProductUncheckedUpdateManyInput>;
    where?: Prisma.ProductWhereInput;
    limit?: number;
};
export type ProductUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductUpdateManyMutationInput, Prisma.ProductUncheckedUpdateManyInput>;
    where?: Prisma.ProductWhereInput;
    limit?: number;
    include?: Prisma.ProductIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateInput, Prisma.ProductUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductUpdateInput, Prisma.ProductUncheckedUpdateInput>;
};
export type ProductDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
    limit?: number;
};
export type Product$manufacturerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManufacturerSelect<ExtArgs> | null;
    omit?: Prisma.ManufacturerOmit<ExtArgs> | null;
    include?: Prisma.ManufacturerInclude<ExtArgs> | null;
    where?: Prisma.ManufacturerWhereInput;
};
export type Product$categoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProductCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProductCategoryInclude<ExtArgs> | null;
    where?: Prisma.ProductCategoryWhereInput;
    orderBy?: Prisma.ProductCategoryOrderByWithRelationInput | Prisma.ProductCategoryOrderByWithRelationInput[];
    cursor?: Prisma.ProductCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductCategoryScalarFieldEnum | Prisma.ProductCategoryScalarFieldEnum[];
};
export type ProductDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
};
