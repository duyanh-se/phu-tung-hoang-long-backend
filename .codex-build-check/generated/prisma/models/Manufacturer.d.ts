import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ManufacturerModel = runtime.Types.Result.DefaultSelection<Prisma.$ManufacturerPayload>;
export type AggregateManufacturer = {
    _count: ManufacturerCountAggregateOutputType | null;
    _avg: ManufacturerAvgAggregateOutputType | null;
    _sum: ManufacturerSumAggregateOutputType | null;
    _min: ManufacturerMinAggregateOutputType | null;
    _max: ManufacturerMaxAggregateOutputType | null;
};
export type ManufacturerAvgAggregateOutputType = {
    legacyId: number | null;
};
export type ManufacturerSumAggregateOutputType = {
    legacyId: number | null;
};
export type ManufacturerMinAggregateOutputType = {
    id: string | null;
    legacyId: number | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ManufacturerMaxAggregateOutputType = {
    id: string | null;
    legacyId: number | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ManufacturerCountAggregateOutputType = {
    id: number;
    legacyId: number;
    name: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ManufacturerAvgAggregateInputType = {
    legacyId?: true;
};
export type ManufacturerSumAggregateInputType = {
    legacyId?: true;
};
export type ManufacturerMinAggregateInputType = {
    id?: true;
    legacyId?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ManufacturerMaxAggregateInputType = {
    id?: true;
    legacyId?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ManufacturerCountAggregateInputType = {
    id?: true;
    legacyId?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ManufacturerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ManufacturerWhereInput;
    orderBy?: Prisma.ManufacturerOrderByWithRelationInput | Prisma.ManufacturerOrderByWithRelationInput[];
    cursor?: Prisma.ManufacturerWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ManufacturerCountAggregateInputType;
    _avg?: ManufacturerAvgAggregateInputType;
    _sum?: ManufacturerSumAggregateInputType;
    _min?: ManufacturerMinAggregateInputType;
    _max?: ManufacturerMaxAggregateInputType;
};
export type GetManufacturerAggregateType<T extends ManufacturerAggregateArgs> = {
    [P in keyof T & keyof AggregateManufacturer]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateManufacturer[P]> : Prisma.GetScalarType<T[P], AggregateManufacturer[P]>;
};
export type ManufacturerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ManufacturerWhereInput;
    orderBy?: Prisma.ManufacturerOrderByWithAggregationInput | Prisma.ManufacturerOrderByWithAggregationInput[];
    by: Prisma.ManufacturerScalarFieldEnum[] | Prisma.ManufacturerScalarFieldEnum;
    having?: Prisma.ManufacturerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ManufacturerCountAggregateInputType | true;
    _avg?: ManufacturerAvgAggregateInputType;
    _sum?: ManufacturerSumAggregateInputType;
    _min?: ManufacturerMinAggregateInputType;
    _max?: ManufacturerMaxAggregateInputType;
};
export type ManufacturerGroupByOutputType = {
    id: string;
    legacyId: number | null;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    _count: ManufacturerCountAggregateOutputType | null;
    _avg: ManufacturerAvgAggregateOutputType | null;
    _sum: ManufacturerSumAggregateOutputType | null;
    _min: ManufacturerMinAggregateOutputType | null;
    _max: ManufacturerMaxAggregateOutputType | null;
};
export type GetManufacturerGroupByPayload<T extends ManufacturerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ManufacturerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ManufacturerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ManufacturerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ManufacturerGroupByOutputType[P]>;
}>>;
export type ManufacturerWhereInput = {
    AND?: Prisma.ManufacturerWhereInput | Prisma.ManufacturerWhereInput[];
    OR?: Prisma.ManufacturerWhereInput[];
    NOT?: Prisma.ManufacturerWhereInput | Prisma.ManufacturerWhereInput[];
    id?: Prisma.UuidFilter<"Manufacturer"> | string;
    legacyId?: Prisma.IntNullableFilter<"Manufacturer"> | number | null;
    name?: Prisma.StringFilter<"Manufacturer"> | string;
    createdAt?: Prisma.DateTimeFilter<"Manufacturer"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Manufacturer"> | Date | string;
    products?: Prisma.ProductListRelationFilter;
};
export type ManufacturerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    legacyId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    products?: Prisma.ProductOrderByRelationAggregateInput;
};
export type ManufacturerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    legacyId?: number;
    AND?: Prisma.ManufacturerWhereInput | Prisma.ManufacturerWhereInput[];
    OR?: Prisma.ManufacturerWhereInput[];
    NOT?: Prisma.ManufacturerWhereInput | Prisma.ManufacturerWhereInput[];
    name?: Prisma.StringFilter<"Manufacturer"> | string;
    createdAt?: Prisma.DateTimeFilter<"Manufacturer"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Manufacturer"> | Date | string;
    products?: Prisma.ProductListRelationFilter;
}, "id" | "legacyId">;
export type ManufacturerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    legacyId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ManufacturerCountOrderByAggregateInput;
    _avg?: Prisma.ManufacturerAvgOrderByAggregateInput;
    _max?: Prisma.ManufacturerMaxOrderByAggregateInput;
    _min?: Prisma.ManufacturerMinOrderByAggregateInput;
    _sum?: Prisma.ManufacturerSumOrderByAggregateInput;
};
export type ManufacturerScalarWhereWithAggregatesInput = {
    AND?: Prisma.ManufacturerScalarWhereWithAggregatesInput | Prisma.ManufacturerScalarWhereWithAggregatesInput[];
    OR?: Prisma.ManufacturerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ManufacturerScalarWhereWithAggregatesInput | Prisma.ManufacturerScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Manufacturer"> | string;
    legacyId?: Prisma.IntNullableWithAggregatesFilter<"Manufacturer"> | number | null;
    name?: Prisma.StringWithAggregatesFilter<"Manufacturer"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Manufacturer"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Manufacturer"> | Date | string;
};
export type ManufacturerCreateInput = {
    id?: string;
    legacyId?: number | null;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    products?: Prisma.ProductCreateNestedManyWithoutManufacturerInput;
};
export type ManufacturerUncheckedCreateInput = {
    id?: string;
    legacyId?: number | null;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutManufacturerInput;
};
export type ManufacturerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legacyId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    products?: Prisma.ProductUpdateManyWithoutManufacturerNestedInput;
};
export type ManufacturerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legacyId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    products?: Prisma.ProductUncheckedUpdateManyWithoutManufacturerNestedInput;
};
export type ManufacturerCreateManyInput = {
    id?: string;
    legacyId?: number | null;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ManufacturerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legacyId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ManufacturerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legacyId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ManufacturerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    legacyId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ManufacturerAvgOrderByAggregateInput = {
    legacyId?: Prisma.SortOrder;
};
export type ManufacturerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    legacyId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ManufacturerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    legacyId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ManufacturerSumOrderByAggregateInput = {
    legacyId?: Prisma.SortOrder;
};
export type ManufacturerNullableScalarRelationFilter = {
    is?: Prisma.ManufacturerWhereInput | null;
    isNot?: Prisma.ManufacturerWhereInput | null;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ManufacturerCreateNestedOneWithoutProductsInput = {
    create?: Prisma.XOR<Prisma.ManufacturerCreateWithoutProductsInput, Prisma.ManufacturerUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.ManufacturerCreateOrConnectWithoutProductsInput;
    connect?: Prisma.ManufacturerWhereUniqueInput;
};
export type ManufacturerUpdateOneWithoutProductsNestedInput = {
    create?: Prisma.XOR<Prisma.ManufacturerCreateWithoutProductsInput, Prisma.ManufacturerUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.ManufacturerCreateOrConnectWithoutProductsInput;
    upsert?: Prisma.ManufacturerUpsertWithoutProductsInput;
    disconnect?: Prisma.ManufacturerWhereInput | boolean;
    delete?: Prisma.ManufacturerWhereInput | boolean;
    connect?: Prisma.ManufacturerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ManufacturerUpdateToOneWithWhereWithoutProductsInput, Prisma.ManufacturerUpdateWithoutProductsInput>, Prisma.ManufacturerUncheckedUpdateWithoutProductsInput>;
};
export type ManufacturerCreateWithoutProductsInput = {
    id?: string;
    legacyId?: number | null;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ManufacturerUncheckedCreateWithoutProductsInput = {
    id?: string;
    legacyId?: number | null;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ManufacturerCreateOrConnectWithoutProductsInput = {
    where: Prisma.ManufacturerWhereUniqueInput;
    create: Prisma.XOR<Prisma.ManufacturerCreateWithoutProductsInput, Prisma.ManufacturerUncheckedCreateWithoutProductsInput>;
};
export type ManufacturerUpsertWithoutProductsInput = {
    update: Prisma.XOR<Prisma.ManufacturerUpdateWithoutProductsInput, Prisma.ManufacturerUncheckedUpdateWithoutProductsInput>;
    create: Prisma.XOR<Prisma.ManufacturerCreateWithoutProductsInput, Prisma.ManufacturerUncheckedCreateWithoutProductsInput>;
    where?: Prisma.ManufacturerWhereInput;
};
export type ManufacturerUpdateToOneWithWhereWithoutProductsInput = {
    where?: Prisma.ManufacturerWhereInput;
    data: Prisma.XOR<Prisma.ManufacturerUpdateWithoutProductsInput, Prisma.ManufacturerUncheckedUpdateWithoutProductsInput>;
};
export type ManufacturerUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legacyId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ManufacturerUncheckedUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legacyId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ManufacturerCountOutputType = {
    products: number;
};
export type ManufacturerCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    products?: boolean | ManufacturerCountOutputTypeCountProductsArgs;
};
export type ManufacturerCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManufacturerCountOutputTypeSelect<ExtArgs> | null;
};
export type ManufacturerCountOutputTypeCountProductsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
};
export type ManufacturerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    legacyId?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    products?: boolean | Prisma.Manufacturer$productsArgs<ExtArgs>;
    _count?: boolean | Prisma.ManufacturerCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["manufacturer"]>;
export type ManufacturerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    legacyId?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["manufacturer"]>;
export type ManufacturerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    legacyId?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["manufacturer"]>;
export type ManufacturerSelectScalar = {
    id?: boolean;
    legacyId?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ManufacturerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "legacyId" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["manufacturer"]>;
export type ManufacturerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    products?: boolean | Prisma.Manufacturer$productsArgs<ExtArgs>;
    _count?: boolean | Prisma.ManufacturerCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ManufacturerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ManufacturerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ManufacturerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Manufacturer";
    objects: {
        products: Prisma.$ProductPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        legacyId: number | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["manufacturer"]>;
    composites: {};
};
export type ManufacturerGetPayload<S extends boolean | null | undefined | ManufacturerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ManufacturerPayload, S>;
export type ManufacturerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ManufacturerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ManufacturerCountAggregateInputType | true;
};
export interface ManufacturerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Manufacturer'];
        meta: {
            name: 'Manufacturer';
        };
    };
    findUnique<T extends ManufacturerFindUniqueArgs>(args: Prisma.SelectSubset<T, ManufacturerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ManufacturerClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ManufacturerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ManufacturerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ManufacturerClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ManufacturerFindFirstArgs>(args?: Prisma.SelectSubset<T, ManufacturerFindFirstArgs<ExtArgs>>): Prisma.Prisma__ManufacturerClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ManufacturerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ManufacturerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ManufacturerClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ManufacturerFindManyArgs>(args?: Prisma.SelectSubset<T, ManufacturerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ManufacturerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ManufacturerCreateArgs>(args: Prisma.SelectSubset<T, ManufacturerCreateArgs<ExtArgs>>): Prisma.Prisma__ManufacturerClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ManufacturerCreateManyArgs>(args?: Prisma.SelectSubset<T, ManufacturerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ManufacturerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ManufacturerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ManufacturerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ManufacturerDeleteArgs>(args: Prisma.SelectSubset<T, ManufacturerDeleteArgs<ExtArgs>>): Prisma.Prisma__ManufacturerClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ManufacturerUpdateArgs>(args: Prisma.SelectSubset<T, ManufacturerUpdateArgs<ExtArgs>>): Prisma.Prisma__ManufacturerClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ManufacturerDeleteManyArgs>(args?: Prisma.SelectSubset<T, ManufacturerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ManufacturerUpdateManyArgs>(args: Prisma.SelectSubset<T, ManufacturerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ManufacturerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ManufacturerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ManufacturerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ManufacturerUpsertArgs>(args: Prisma.SelectSubset<T, ManufacturerUpsertArgs<ExtArgs>>): Prisma.Prisma__ManufacturerClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ManufacturerCountArgs>(args?: Prisma.Subset<T, ManufacturerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ManufacturerCountAggregateOutputType> : number>;
    aggregate<T extends ManufacturerAggregateArgs>(args: Prisma.Subset<T, ManufacturerAggregateArgs>): Prisma.PrismaPromise<GetManufacturerAggregateType<T>>;
    groupBy<T extends ManufacturerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ManufacturerGroupByArgs['orderBy'];
    } : {
        orderBy?: ManufacturerGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ManufacturerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetManufacturerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ManufacturerFieldRefs;
}
export interface Prisma__ManufacturerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    products<T extends Prisma.Manufacturer$productsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Manufacturer$productsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ManufacturerFieldRefs {
    readonly id: Prisma.FieldRef<"Manufacturer", 'String'>;
    readonly legacyId: Prisma.FieldRef<"Manufacturer", 'Int'>;
    readonly name: Prisma.FieldRef<"Manufacturer", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Manufacturer", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Manufacturer", 'DateTime'>;
}
export type ManufacturerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManufacturerSelect<ExtArgs> | null;
    omit?: Prisma.ManufacturerOmit<ExtArgs> | null;
    include?: Prisma.ManufacturerInclude<ExtArgs> | null;
    where: Prisma.ManufacturerWhereUniqueInput;
};
export type ManufacturerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManufacturerSelect<ExtArgs> | null;
    omit?: Prisma.ManufacturerOmit<ExtArgs> | null;
    include?: Prisma.ManufacturerInclude<ExtArgs> | null;
    where: Prisma.ManufacturerWhereUniqueInput;
};
export type ManufacturerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManufacturerSelect<ExtArgs> | null;
    omit?: Prisma.ManufacturerOmit<ExtArgs> | null;
    include?: Prisma.ManufacturerInclude<ExtArgs> | null;
    where?: Prisma.ManufacturerWhereInput;
    orderBy?: Prisma.ManufacturerOrderByWithRelationInput | Prisma.ManufacturerOrderByWithRelationInput[];
    cursor?: Prisma.ManufacturerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ManufacturerScalarFieldEnum | Prisma.ManufacturerScalarFieldEnum[];
};
export type ManufacturerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManufacturerSelect<ExtArgs> | null;
    omit?: Prisma.ManufacturerOmit<ExtArgs> | null;
    include?: Prisma.ManufacturerInclude<ExtArgs> | null;
    where?: Prisma.ManufacturerWhereInput;
    orderBy?: Prisma.ManufacturerOrderByWithRelationInput | Prisma.ManufacturerOrderByWithRelationInput[];
    cursor?: Prisma.ManufacturerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ManufacturerScalarFieldEnum | Prisma.ManufacturerScalarFieldEnum[];
};
export type ManufacturerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManufacturerSelect<ExtArgs> | null;
    omit?: Prisma.ManufacturerOmit<ExtArgs> | null;
    include?: Prisma.ManufacturerInclude<ExtArgs> | null;
    where?: Prisma.ManufacturerWhereInput;
    orderBy?: Prisma.ManufacturerOrderByWithRelationInput | Prisma.ManufacturerOrderByWithRelationInput[];
    cursor?: Prisma.ManufacturerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ManufacturerScalarFieldEnum | Prisma.ManufacturerScalarFieldEnum[];
};
export type ManufacturerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManufacturerSelect<ExtArgs> | null;
    omit?: Prisma.ManufacturerOmit<ExtArgs> | null;
    include?: Prisma.ManufacturerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ManufacturerCreateInput, Prisma.ManufacturerUncheckedCreateInput>;
};
export type ManufacturerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ManufacturerCreateManyInput | Prisma.ManufacturerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ManufacturerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManufacturerSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ManufacturerOmit<ExtArgs> | null;
    data: Prisma.ManufacturerCreateManyInput | Prisma.ManufacturerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ManufacturerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManufacturerSelect<ExtArgs> | null;
    omit?: Prisma.ManufacturerOmit<ExtArgs> | null;
    include?: Prisma.ManufacturerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ManufacturerUpdateInput, Prisma.ManufacturerUncheckedUpdateInput>;
    where: Prisma.ManufacturerWhereUniqueInput;
};
export type ManufacturerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ManufacturerUpdateManyMutationInput, Prisma.ManufacturerUncheckedUpdateManyInput>;
    where?: Prisma.ManufacturerWhereInput;
    limit?: number;
};
export type ManufacturerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManufacturerSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ManufacturerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ManufacturerUpdateManyMutationInput, Prisma.ManufacturerUncheckedUpdateManyInput>;
    where?: Prisma.ManufacturerWhereInput;
    limit?: number;
};
export type ManufacturerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManufacturerSelect<ExtArgs> | null;
    omit?: Prisma.ManufacturerOmit<ExtArgs> | null;
    include?: Prisma.ManufacturerInclude<ExtArgs> | null;
    where: Prisma.ManufacturerWhereUniqueInput;
    create: Prisma.XOR<Prisma.ManufacturerCreateInput, Prisma.ManufacturerUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ManufacturerUpdateInput, Prisma.ManufacturerUncheckedUpdateInput>;
};
export type ManufacturerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManufacturerSelect<ExtArgs> | null;
    omit?: Prisma.ManufacturerOmit<ExtArgs> | null;
    include?: Prisma.ManufacturerInclude<ExtArgs> | null;
    where: Prisma.ManufacturerWhereUniqueInput;
};
export type ManufacturerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ManufacturerWhereInput;
    limit?: number;
};
export type Manufacturer$productsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ManufacturerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManufacturerSelect<ExtArgs> | null;
    omit?: Prisma.ManufacturerOmit<ExtArgs> | null;
    include?: Prisma.ManufacturerInclude<ExtArgs> | null;
};
