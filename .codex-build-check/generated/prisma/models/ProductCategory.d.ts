import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ProductCategoryModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductCategoryPayload>;
export type AggregateProductCategory = {
    _count: ProductCategoryCountAggregateOutputType | null;
    _min: ProductCategoryMinAggregateOutputType | null;
    _max: ProductCategoryMaxAggregateOutputType | null;
};
export type ProductCategoryMinAggregateOutputType = {
    productId: string | null;
    categoryId: string | null;
};
export type ProductCategoryMaxAggregateOutputType = {
    productId: string | null;
    categoryId: string | null;
};
export type ProductCategoryCountAggregateOutputType = {
    productId: number;
    categoryId: number;
    _all: number;
};
export type ProductCategoryMinAggregateInputType = {
    productId?: true;
    categoryId?: true;
};
export type ProductCategoryMaxAggregateInputType = {
    productId?: true;
    categoryId?: true;
};
export type ProductCategoryCountAggregateInputType = {
    productId?: true;
    categoryId?: true;
    _all?: true;
};
export type ProductCategoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductCategoryWhereInput;
    orderBy?: Prisma.ProductCategoryOrderByWithRelationInput | Prisma.ProductCategoryOrderByWithRelationInput[];
    cursor?: Prisma.ProductCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductCategoryCountAggregateInputType;
    _min?: ProductCategoryMinAggregateInputType;
    _max?: ProductCategoryMaxAggregateInputType;
};
export type GetProductCategoryAggregateType<T extends ProductCategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateProductCategory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductCategory[P]> : Prisma.GetScalarType<T[P], AggregateProductCategory[P]>;
};
export type ProductCategoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductCategoryWhereInput;
    orderBy?: Prisma.ProductCategoryOrderByWithAggregationInput | Prisma.ProductCategoryOrderByWithAggregationInput[];
    by: Prisma.ProductCategoryScalarFieldEnum[] | Prisma.ProductCategoryScalarFieldEnum;
    having?: Prisma.ProductCategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductCategoryCountAggregateInputType | true;
    _min?: ProductCategoryMinAggregateInputType;
    _max?: ProductCategoryMaxAggregateInputType;
};
export type ProductCategoryGroupByOutputType = {
    productId: string;
    categoryId: string;
    _count: ProductCategoryCountAggregateOutputType | null;
    _min: ProductCategoryMinAggregateOutputType | null;
    _max: ProductCategoryMaxAggregateOutputType | null;
};
export type GetProductCategoryGroupByPayload<T extends ProductCategoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductCategoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductCategoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductCategoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductCategoryGroupByOutputType[P]>;
}>>;
export type ProductCategoryWhereInput = {
    AND?: Prisma.ProductCategoryWhereInput | Prisma.ProductCategoryWhereInput[];
    OR?: Prisma.ProductCategoryWhereInput[];
    NOT?: Prisma.ProductCategoryWhereInput | Prisma.ProductCategoryWhereInput[];
    productId?: Prisma.UuidFilter<"ProductCategory"> | string;
    categoryId?: Prisma.UuidFilter<"ProductCategory"> | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
};
export type ProductCategoryOrderByWithRelationInput = {
    productId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    category?: Prisma.CategoryOrderByWithRelationInput;
};
export type ProductCategoryWhereUniqueInput = Prisma.AtLeast<{
    productId_categoryId?: Prisma.ProductCategoryProductIdCategoryIdCompoundUniqueInput;
    AND?: Prisma.ProductCategoryWhereInput | Prisma.ProductCategoryWhereInput[];
    OR?: Prisma.ProductCategoryWhereInput[];
    NOT?: Prisma.ProductCategoryWhereInput | Prisma.ProductCategoryWhereInput[];
    productId?: Prisma.UuidFilter<"ProductCategory"> | string;
    categoryId?: Prisma.UuidFilter<"ProductCategory"> | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
}, "productId_categoryId">;
export type ProductCategoryOrderByWithAggregationInput = {
    productId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    _count?: Prisma.ProductCategoryCountOrderByAggregateInput;
    _max?: Prisma.ProductCategoryMaxOrderByAggregateInput;
    _min?: Prisma.ProductCategoryMinOrderByAggregateInput;
};
export type ProductCategoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductCategoryScalarWhereWithAggregatesInput | Prisma.ProductCategoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductCategoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductCategoryScalarWhereWithAggregatesInput | Prisma.ProductCategoryScalarWhereWithAggregatesInput[];
    productId?: Prisma.UuidWithAggregatesFilter<"ProductCategory"> | string;
    categoryId?: Prisma.UuidWithAggregatesFilter<"ProductCategory"> | string;
};
export type ProductCategoryCreateInput = {
    product: Prisma.ProductCreateNestedOneWithoutCategoriesInput;
    category: Prisma.CategoryCreateNestedOneWithoutProductsInput;
};
export type ProductCategoryUncheckedCreateInput = {
    productId: string;
    categoryId: string;
};
export type ProductCategoryUpdateInput = {
    product?: Prisma.ProductUpdateOneRequiredWithoutCategoriesNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutProductsNestedInput;
};
export type ProductCategoryUncheckedUpdateInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductCategoryCreateManyInput = {
    productId: string;
    categoryId: string;
};
export type ProductCategoryUpdateManyMutationInput = {};
export type ProductCategoryUncheckedUpdateManyInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductCategoryListRelationFilter = {
    every?: Prisma.ProductCategoryWhereInput;
    some?: Prisma.ProductCategoryWhereInput;
    none?: Prisma.ProductCategoryWhereInput;
};
export type ProductCategoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductCategoryProductIdCategoryIdCompoundUniqueInput = {
    productId: string;
    categoryId: string;
};
export type ProductCategoryCountOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type ProductCategoryMaxOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type ProductCategoryMinOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type ProductCategoryCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductCategoryCreateWithoutProductInput, Prisma.ProductCategoryUncheckedCreateWithoutProductInput> | Prisma.ProductCategoryCreateWithoutProductInput[] | Prisma.ProductCategoryUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductCategoryCreateOrConnectWithoutProductInput | Prisma.ProductCategoryCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductCategoryCreateManyProductInputEnvelope;
    connect?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
};
export type ProductCategoryUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductCategoryCreateWithoutProductInput, Prisma.ProductCategoryUncheckedCreateWithoutProductInput> | Prisma.ProductCategoryCreateWithoutProductInput[] | Prisma.ProductCategoryUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductCategoryCreateOrConnectWithoutProductInput | Prisma.ProductCategoryCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductCategoryCreateManyProductInputEnvelope;
    connect?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
};
export type ProductCategoryUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCategoryCreateWithoutProductInput, Prisma.ProductCategoryUncheckedCreateWithoutProductInput> | Prisma.ProductCategoryCreateWithoutProductInput[] | Prisma.ProductCategoryUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductCategoryCreateOrConnectWithoutProductInput | Prisma.ProductCategoryCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductCategoryUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductCategoryUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductCategoryCreateManyProductInputEnvelope;
    set?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
    disconnect?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
    delete?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
    connect?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
    update?: Prisma.ProductCategoryUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductCategoryUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductCategoryUpdateManyWithWhereWithoutProductInput | Prisma.ProductCategoryUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductCategoryScalarWhereInput | Prisma.ProductCategoryScalarWhereInput[];
};
export type ProductCategoryUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCategoryCreateWithoutProductInput, Prisma.ProductCategoryUncheckedCreateWithoutProductInput> | Prisma.ProductCategoryCreateWithoutProductInput[] | Prisma.ProductCategoryUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductCategoryCreateOrConnectWithoutProductInput | Prisma.ProductCategoryCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductCategoryUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductCategoryUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductCategoryCreateManyProductInputEnvelope;
    set?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
    disconnect?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
    delete?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
    connect?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
    update?: Prisma.ProductCategoryUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductCategoryUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductCategoryUpdateManyWithWhereWithoutProductInput | Prisma.ProductCategoryUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductCategoryScalarWhereInput | Prisma.ProductCategoryScalarWhereInput[];
};
export type ProductCategoryCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.ProductCategoryCreateWithoutCategoryInput, Prisma.ProductCategoryUncheckedCreateWithoutCategoryInput> | Prisma.ProductCategoryCreateWithoutCategoryInput[] | Prisma.ProductCategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ProductCategoryCreateOrConnectWithoutCategoryInput | Prisma.ProductCategoryCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.ProductCategoryCreateManyCategoryInputEnvelope;
    connect?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
};
export type ProductCategoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.ProductCategoryCreateWithoutCategoryInput, Prisma.ProductCategoryUncheckedCreateWithoutCategoryInput> | Prisma.ProductCategoryCreateWithoutCategoryInput[] | Prisma.ProductCategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ProductCategoryCreateOrConnectWithoutCategoryInput | Prisma.ProductCategoryCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.ProductCategoryCreateManyCategoryInputEnvelope;
    connect?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
};
export type ProductCategoryUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCategoryCreateWithoutCategoryInput, Prisma.ProductCategoryUncheckedCreateWithoutCategoryInput> | Prisma.ProductCategoryCreateWithoutCategoryInput[] | Prisma.ProductCategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ProductCategoryCreateOrConnectWithoutCategoryInput | Prisma.ProductCategoryCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.ProductCategoryUpsertWithWhereUniqueWithoutCategoryInput | Prisma.ProductCategoryUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.ProductCategoryCreateManyCategoryInputEnvelope;
    set?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
    disconnect?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
    delete?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
    connect?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
    update?: Prisma.ProductCategoryUpdateWithWhereUniqueWithoutCategoryInput | Prisma.ProductCategoryUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.ProductCategoryUpdateManyWithWhereWithoutCategoryInput | Prisma.ProductCategoryUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.ProductCategoryScalarWhereInput | Prisma.ProductCategoryScalarWhereInput[];
};
export type ProductCategoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCategoryCreateWithoutCategoryInput, Prisma.ProductCategoryUncheckedCreateWithoutCategoryInput> | Prisma.ProductCategoryCreateWithoutCategoryInput[] | Prisma.ProductCategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.ProductCategoryCreateOrConnectWithoutCategoryInput | Prisma.ProductCategoryCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.ProductCategoryUpsertWithWhereUniqueWithoutCategoryInput | Prisma.ProductCategoryUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.ProductCategoryCreateManyCategoryInputEnvelope;
    set?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
    disconnect?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
    delete?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
    connect?: Prisma.ProductCategoryWhereUniqueInput | Prisma.ProductCategoryWhereUniqueInput[];
    update?: Prisma.ProductCategoryUpdateWithWhereUniqueWithoutCategoryInput | Prisma.ProductCategoryUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.ProductCategoryUpdateManyWithWhereWithoutCategoryInput | Prisma.ProductCategoryUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.ProductCategoryScalarWhereInput | Prisma.ProductCategoryScalarWhereInput[];
};
export type ProductCategoryCreateWithoutProductInput = {
    category: Prisma.CategoryCreateNestedOneWithoutProductsInput;
};
export type ProductCategoryUncheckedCreateWithoutProductInput = {
    categoryId: string;
};
export type ProductCategoryCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCategoryCreateWithoutProductInput, Prisma.ProductCategoryUncheckedCreateWithoutProductInput>;
};
export type ProductCategoryCreateManyProductInputEnvelope = {
    data: Prisma.ProductCategoryCreateManyProductInput | Prisma.ProductCategoryCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductCategoryUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductCategoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductCategoryUpdateWithoutProductInput, Prisma.ProductCategoryUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductCategoryCreateWithoutProductInput, Prisma.ProductCategoryUncheckedCreateWithoutProductInput>;
};
export type ProductCategoryUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductCategoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductCategoryUpdateWithoutProductInput, Prisma.ProductCategoryUncheckedUpdateWithoutProductInput>;
};
export type ProductCategoryUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductCategoryScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductCategoryUpdateManyMutationInput, Prisma.ProductCategoryUncheckedUpdateManyWithoutProductInput>;
};
export type ProductCategoryScalarWhereInput = {
    AND?: Prisma.ProductCategoryScalarWhereInput | Prisma.ProductCategoryScalarWhereInput[];
    OR?: Prisma.ProductCategoryScalarWhereInput[];
    NOT?: Prisma.ProductCategoryScalarWhereInput | Prisma.ProductCategoryScalarWhereInput[];
    productId?: Prisma.UuidFilter<"ProductCategory"> | string;
    categoryId?: Prisma.UuidFilter<"ProductCategory"> | string;
};
export type ProductCategoryCreateWithoutCategoryInput = {
    product: Prisma.ProductCreateNestedOneWithoutCategoriesInput;
};
export type ProductCategoryUncheckedCreateWithoutCategoryInput = {
    productId: string;
};
export type ProductCategoryCreateOrConnectWithoutCategoryInput = {
    where: Prisma.ProductCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCategoryCreateWithoutCategoryInput, Prisma.ProductCategoryUncheckedCreateWithoutCategoryInput>;
};
export type ProductCategoryCreateManyCategoryInputEnvelope = {
    data: Prisma.ProductCategoryCreateManyCategoryInput | Prisma.ProductCategoryCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type ProductCategoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.ProductCategoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductCategoryUpdateWithoutCategoryInput, Prisma.ProductCategoryUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.ProductCategoryCreateWithoutCategoryInput, Prisma.ProductCategoryUncheckedCreateWithoutCategoryInput>;
};
export type ProductCategoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.ProductCategoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductCategoryUpdateWithoutCategoryInput, Prisma.ProductCategoryUncheckedUpdateWithoutCategoryInput>;
};
export type ProductCategoryUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.ProductCategoryScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductCategoryUpdateManyMutationInput, Prisma.ProductCategoryUncheckedUpdateManyWithoutCategoryInput>;
};
export type ProductCategoryCreateManyProductInput = {
    categoryId: string;
};
export type ProductCategoryUpdateWithoutProductInput = {
    category?: Prisma.CategoryUpdateOneRequiredWithoutProductsNestedInput;
};
export type ProductCategoryUncheckedUpdateWithoutProductInput = {
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductCategoryUncheckedUpdateManyWithoutProductInput = {
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductCategoryCreateManyCategoryInput = {
    productId: string;
};
export type ProductCategoryUpdateWithoutCategoryInput = {
    product?: Prisma.ProductUpdateOneRequiredWithoutCategoriesNestedInput;
};
export type ProductCategoryUncheckedUpdateWithoutCategoryInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductCategoryUncheckedUpdateManyWithoutCategoryInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductCategorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    categoryId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productCategory"]>;
export type ProductCategorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    categoryId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productCategory"]>;
export type ProductCategorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    categoryId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productCategory"]>;
export type ProductCategorySelectScalar = {
    productId?: boolean;
    categoryId?: boolean;
};
export type ProductCategoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"productId" | "categoryId", ExtArgs["result"]["productCategory"]>;
export type ProductCategoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type ProductCategoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type ProductCategoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type $ProductCategoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductCategory";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        category: Prisma.$CategoryPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        productId: string;
        categoryId: string;
    }, ExtArgs["result"]["productCategory"]>;
    composites: {};
};
export type ProductCategoryGetPayload<S extends boolean | null | undefined | ProductCategoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductCategoryPayload, S>;
export type ProductCategoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductCategoryCountAggregateInputType | true;
};
export interface ProductCategoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductCategory'];
        meta: {
            name: 'ProductCategory';
        };
    };
    findUnique<T extends ProductCategoryFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductCategoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductCategoryClient<runtime.Types.Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductCategoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductCategoryClient<runtime.Types.Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductCategoryFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductCategoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductCategoryClient<runtime.Types.Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductCategoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductCategoryClient<runtime.Types.Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductCategoryFindManyArgs>(args?: Prisma.SelectSubset<T, ProductCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductCategoryCreateArgs>(args: Prisma.SelectSubset<T, ProductCategoryCreateArgs<ExtArgs>>): Prisma.Prisma__ProductCategoryClient<runtime.Types.Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductCategoryCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductCategoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductCategoryDeleteArgs>(args: Prisma.SelectSubset<T, ProductCategoryDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductCategoryClient<runtime.Types.Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductCategoryUpdateArgs>(args: Prisma.SelectSubset<T, ProductCategoryUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductCategoryClient<runtime.Types.Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductCategoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductCategoryUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductCategoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductCategoryUpsertArgs>(args: Prisma.SelectSubset<T, ProductCategoryUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductCategoryClient<runtime.Types.Result.GetResult<Prisma.$ProductCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductCategoryCountArgs>(args?: Prisma.Subset<T, ProductCategoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductCategoryCountAggregateOutputType> : number>;
    aggregate<T extends ProductCategoryAggregateArgs>(args: Prisma.Subset<T, ProductCategoryAggregateArgs>): Prisma.PrismaPromise<GetProductCategoryAggregateType<T>>;
    groupBy<T extends ProductCategoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductCategoryGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductCategoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductCategoryFieldRefs;
}
export interface Prisma__ProductCategoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    category<T extends Prisma.CategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductCategoryFieldRefs {
    readonly productId: Prisma.FieldRef<"ProductCategory", 'String'>;
    readonly categoryId: Prisma.FieldRef<"ProductCategory", 'String'>;
}
export type ProductCategoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProductCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProductCategoryInclude<ExtArgs> | null;
    where: Prisma.ProductCategoryWhereUniqueInput;
};
export type ProductCategoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProductCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProductCategoryInclude<ExtArgs> | null;
    where: Prisma.ProductCategoryWhereUniqueInput;
};
export type ProductCategoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductCategoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductCategoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductCategoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProductCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProductCategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductCategoryCreateInput, Prisma.ProductCategoryUncheckedCreateInput>;
};
export type ProductCategoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductCategoryCreateManyInput | Prisma.ProductCategoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductCategoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductCategorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductCategoryOmit<ExtArgs> | null;
    data: Prisma.ProductCategoryCreateManyInput | Prisma.ProductCategoryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductCategoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductCategoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProductCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProductCategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductCategoryUpdateInput, Prisma.ProductCategoryUncheckedUpdateInput>;
    where: Prisma.ProductCategoryWhereUniqueInput;
};
export type ProductCategoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductCategoryUpdateManyMutationInput, Prisma.ProductCategoryUncheckedUpdateManyInput>;
    where?: Prisma.ProductCategoryWhereInput;
    limit?: number;
};
export type ProductCategoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductCategorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductCategoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductCategoryUpdateManyMutationInput, Prisma.ProductCategoryUncheckedUpdateManyInput>;
    where?: Prisma.ProductCategoryWhereInput;
    limit?: number;
    include?: Prisma.ProductCategoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductCategoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProductCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProductCategoryInclude<ExtArgs> | null;
    where: Prisma.ProductCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCategoryCreateInput, Prisma.ProductCategoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductCategoryUpdateInput, Prisma.ProductCategoryUncheckedUpdateInput>;
};
export type ProductCategoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProductCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProductCategoryInclude<ExtArgs> | null;
    where: Prisma.ProductCategoryWhereUniqueInput;
};
export type ProductCategoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductCategoryWhereInput;
    limit?: number;
};
export type ProductCategoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductCategorySelect<ExtArgs> | null;
    omit?: Prisma.ProductCategoryOmit<ExtArgs> | null;
    include?: Prisma.ProductCategoryInclude<ExtArgs> | null;
};
