import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type ContactRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$ContactRequestPayload>;
export type AggregateContactRequest = {
    _count: ContactRequestCountAggregateOutputType | null;
    _min: ContactRequestMinAggregateOutputType | null;
    _max: ContactRequestMaxAggregateOutputType | null;
};
export type ContactRequestMinAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    email: string | null;
    phoneNumber: string | null;
    reason: string | null;
    status: $Enums.ContactRequestStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ContactRequestMaxAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    email: string | null;
    phoneNumber: string | null;
    reason: string | null;
    status: $Enums.ContactRequestStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ContactRequestCountAggregateOutputType = {
    id: number;
    fullName: number;
    email: number;
    phoneNumber: number;
    reason: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ContactRequestMinAggregateInputType = {
    id?: true;
    fullName?: true;
    email?: true;
    phoneNumber?: true;
    reason?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ContactRequestMaxAggregateInputType = {
    id?: true;
    fullName?: true;
    email?: true;
    phoneNumber?: true;
    reason?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ContactRequestCountAggregateInputType = {
    id?: true;
    fullName?: true;
    email?: true;
    phoneNumber?: true;
    reason?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ContactRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContactRequestWhereInput;
    orderBy?: Prisma.ContactRequestOrderByWithRelationInput | Prisma.ContactRequestOrderByWithRelationInput[];
    cursor?: Prisma.ContactRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ContactRequestCountAggregateInputType;
    _min?: ContactRequestMinAggregateInputType;
    _max?: ContactRequestMaxAggregateInputType;
};
export type GetContactRequestAggregateType<T extends ContactRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateContactRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateContactRequest[P]> : Prisma.GetScalarType<T[P], AggregateContactRequest[P]>;
};
export type ContactRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContactRequestWhereInput;
    orderBy?: Prisma.ContactRequestOrderByWithAggregationInput | Prisma.ContactRequestOrderByWithAggregationInput[];
    by: Prisma.ContactRequestScalarFieldEnum[] | Prisma.ContactRequestScalarFieldEnum;
    having?: Prisma.ContactRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ContactRequestCountAggregateInputType | true;
    _min?: ContactRequestMinAggregateInputType;
    _max?: ContactRequestMaxAggregateInputType;
};
export type ContactRequestGroupByOutputType = {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    reason: string | null;
    status: $Enums.ContactRequestStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: ContactRequestCountAggregateOutputType | null;
    _min: ContactRequestMinAggregateOutputType | null;
    _max: ContactRequestMaxAggregateOutputType | null;
};
export type GetContactRequestGroupByPayload<T extends ContactRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ContactRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ContactRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ContactRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ContactRequestGroupByOutputType[P]>;
}>>;
export type ContactRequestWhereInput = {
    AND?: Prisma.ContactRequestWhereInput | Prisma.ContactRequestWhereInput[];
    OR?: Prisma.ContactRequestWhereInput[];
    NOT?: Prisma.ContactRequestWhereInput | Prisma.ContactRequestWhereInput[];
    id?: Prisma.UuidFilter<"ContactRequest"> | string;
    fullName?: Prisma.StringFilter<"ContactRequest"> | string;
    email?: Prisma.StringFilter<"ContactRequest"> | string;
    phoneNumber?: Prisma.StringFilter<"ContactRequest"> | string;
    reason?: Prisma.StringNullableFilter<"ContactRequest"> | string | null;
    status?: Prisma.EnumContactRequestStatusFilter<"ContactRequest"> | $Enums.ContactRequestStatus;
    createdAt?: Prisma.DateTimeFilter<"ContactRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ContactRequest"> | Date | string;
};
export type ContactRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ContactRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ContactRequestWhereInput | Prisma.ContactRequestWhereInput[];
    OR?: Prisma.ContactRequestWhereInput[];
    NOT?: Prisma.ContactRequestWhereInput | Prisma.ContactRequestWhereInput[];
    fullName?: Prisma.StringFilter<"ContactRequest"> | string;
    email?: Prisma.StringFilter<"ContactRequest"> | string;
    phoneNumber?: Prisma.StringFilter<"ContactRequest"> | string;
    reason?: Prisma.StringNullableFilter<"ContactRequest"> | string | null;
    status?: Prisma.EnumContactRequestStatusFilter<"ContactRequest"> | $Enums.ContactRequestStatus;
    createdAt?: Prisma.DateTimeFilter<"ContactRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ContactRequest"> | Date | string;
}, "id">;
export type ContactRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ContactRequestCountOrderByAggregateInput;
    _max?: Prisma.ContactRequestMaxOrderByAggregateInput;
    _min?: Prisma.ContactRequestMinOrderByAggregateInput;
};
export type ContactRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.ContactRequestScalarWhereWithAggregatesInput | Prisma.ContactRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.ContactRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ContactRequestScalarWhereWithAggregatesInput | Prisma.ContactRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ContactRequest"> | string;
    fullName?: Prisma.StringWithAggregatesFilter<"ContactRequest"> | string;
    email?: Prisma.StringWithAggregatesFilter<"ContactRequest"> | string;
    phoneNumber?: Prisma.StringWithAggregatesFilter<"ContactRequest"> | string;
    reason?: Prisma.StringNullableWithAggregatesFilter<"ContactRequest"> | string | null;
    status?: Prisma.EnumContactRequestStatusWithAggregatesFilter<"ContactRequest"> | $Enums.ContactRequestStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ContactRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ContactRequest"> | Date | string;
};
export type ContactRequestCreateInput = {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    reason?: string | null;
    status?: $Enums.ContactRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ContactRequestUncheckedCreateInput = {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    reason?: string | null;
    status?: $Enums.ContactRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ContactRequestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumContactRequestStatusFieldUpdateOperationsInput | $Enums.ContactRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContactRequestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumContactRequestStatusFieldUpdateOperationsInput | $Enums.ContactRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContactRequestCreateManyInput = {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    reason?: string | null;
    status?: $Enums.ContactRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ContactRequestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumContactRequestStatusFieldUpdateOperationsInput | $Enums.ContactRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContactRequestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumContactRequestStatusFieldUpdateOperationsInput | $Enums.ContactRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContactRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ContactRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ContactRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type EnumContactRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.ContactRequestStatus;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type ContactRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    phoneNumber?: boolean;
    reason?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["contactRequest"]>;
export type ContactRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    phoneNumber?: boolean;
    reason?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["contactRequest"]>;
export type ContactRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    phoneNumber?: boolean;
    reason?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["contactRequest"]>;
export type ContactRequestSelectScalar = {
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    phoneNumber?: boolean;
    reason?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ContactRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "fullName" | "email" | "phoneNumber" | "reason" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["contactRequest"]>;
export type $ContactRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ContactRequest";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        fullName: string;
        email: string;
        phoneNumber: string;
        reason: string | null;
        status: $Enums.ContactRequestStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["contactRequest"]>;
    composites: {};
};
export type ContactRequestGetPayload<S extends boolean | null | undefined | ContactRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ContactRequestPayload, S>;
export type ContactRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ContactRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ContactRequestCountAggregateInputType | true;
};
export interface ContactRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ContactRequest'];
        meta: {
            name: 'ContactRequest';
        };
    };
    findUnique<T extends ContactRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, ContactRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ContactRequestClient<runtime.Types.Result.GetResult<Prisma.$ContactRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ContactRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ContactRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ContactRequestClient<runtime.Types.Result.GetResult<Prisma.$ContactRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ContactRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, ContactRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__ContactRequestClient<runtime.Types.Result.GetResult<Prisma.$ContactRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ContactRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ContactRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ContactRequestClient<runtime.Types.Result.GetResult<Prisma.$ContactRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ContactRequestFindManyArgs>(args?: Prisma.SelectSubset<T, ContactRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContactRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ContactRequestCreateArgs>(args: Prisma.SelectSubset<T, ContactRequestCreateArgs<ExtArgs>>): Prisma.Prisma__ContactRequestClient<runtime.Types.Result.GetResult<Prisma.$ContactRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ContactRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, ContactRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ContactRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ContactRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContactRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ContactRequestDeleteArgs>(args: Prisma.SelectSubset<T, ContactRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__ContactRequestClient<runtime.Types.Result.GetResult<Prisma.$ContactRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ContactRequestUpdateArgs>(args: Prisma.SelectSubset<T, ContactRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__ContactRequestClient<runtime.Types.Result.GetResult<Prisma.$ContactRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ContactRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, ContactRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ContactRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, ContactRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ContactRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ContactRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContactRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ContactRequestUpsertArgs>(args: Prisma.SelectSubset<T, ContactRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__ContactRequestClient<runtime.Types.Result.GetResult<Prisma.$ContactRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ContactRequestCountArgs>(args?: Prisma.Subset<T, ContactRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ContactRequestCountAggregateOutputType> : number>;
    aggregate<T extends ContactRequestAggregateArgs>(args: Prisma.Subset<T, ContactRequestAggregateArgs>): Prisma.PrismaPromise<GetContactRequestAggregateType<T>>;
    groupBy<T extends ContactRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ContactRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: ContactRequestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ContactRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ContactRequestFieldRefs;
}
export interface Prisma__ContactRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ContactRequestFieldRefs {
    readonly id: Prisma.FieldRef<"ContactRequest", 'String'>;
    readonly fullName: Prisma.FieldRef<"ContactRequest", 'String'>;
    readonly email: Prisma.FieldRef<"ContactRequest", 'String'>;
    readonly phoneNumber: Prisma.FieldRef<"ContactRequest", 'String'>;
    readonly reason: Prisma.FieldRef<"ContactRequest", 'String'>;
    readonly status: Prisma.FieldRef<"ContactRequest", 'ContactRequestStatus'>;
    readonly createdAt: Prisma.FieldRef<"ContactRequest", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ContactRequest", 'DateTime'>;
}
export type ContactRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContactRequestSelect<ExtArgs> | null;
    omit?: Prisma.ContactRequestOmit<ExtArgs> | null;
    where: Prisma.ContactRequestWhereUniqueInput;
};
export type ContactRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContactRequestSelect<ExtArgs> | null;
    omit?: Prisma.ContactRequestOmit<ExtArgs> | null;
    where: Prisma.ContactRequestWhereUniqueInput;
};
export type ContactRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContactRequestSelect<ExtArgs> | null;
    omit?: Prisma.ContactRequestOmit<ExtArgs> | null;
    where?: Prisma.ContactRequestWhereInput;
    orderBy?: Prisma.ContactRequestOrderByWithRelationInput | Prisma.ContactRequestOrderByWithRelationInput[];
    cursor?: Prisma.ContactRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ContactRequestScalarFieldEnum | Prisma.ContactRequestScalarFieldEnum[];
};
export type ContactRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContactRequestSelect<ExtArgs> | null;
    omit?: Prisma.ContactRequestOmit<ExtArgs> | null;
    where?: Prisma.ContactRequestWhereInput;
    orderBy?: Prisma.ContactRequestOrderByWithRelationInput | Prisma.ContactRequestOrderByWithRelationInput[];
    cursor?: Prisma.ContactRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ContactRequestScalarFieldEnum | Prisma.ContactRequestScalarFieldEnum[];
};
export type ContactRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContactRequestSelect<ExtArgs> | null;
    omit?: Prisma.ContactRequestOmit<ExtArgs> | null;
    where?: Prisma.ContactRequestWhereInput;
    orderBy?: Prisma.ContactRequestOrderByWithRelationInput | Prisma.ContactRequestOrderByWithRelationInput[];
    cursor?: Prisma.ContactRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ContactRequestScalarFieldEnum | Prisma.ContactRequestScalarFieldEnum[];
};
export type ContactRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContactRequestSelect<ExtArgs> | null;
    omit?: Prisma.ContactRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ContactRequestCreateInput, Prisma.ContactRequestUncheckedCreateInput>;
};
export type ContactRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ContactRequestCreateManyInput | Prisma.ContactRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ContactRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContactRequestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ContactRequestOmit<ExtArgs> | null;
    data: Prisma.ContactRequestCreateManyInput | Prisma.ContactRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ContactRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContactRequestSelect<ExtArgs> | null;
    omit?: Prisma.ContactRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ContactRequestUpdateInput, Prisma.ContactRequestUncheckedUpdateInput>;
    where: Prisma.ContactRequestWhereUniqueInput;
};
export type ContactRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ContactRequestUpdateManyMutationInput, Prisma.ContactRequestUncheckedUpdateManyInput>;
    where?: Prisma.ContactRequestWhereInput;
    limit?: number;
};
export type ContactRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContactRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ContactRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ContactRequestUpdateManyMutationInput, Prisma.ContactRequestUncheckedUpdateManyInput>;
    where?: Prisma.ContactRequestWhereInput;
    limit?: number;
};
export type ContactRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContactRequestSelect<ExtArgs> | null;
    omit?: Prisma.ContactRequestOmit<ExtArgs> | null;
    where: Prisma.ContactRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.ContactRequestCreateInput, Prisma.ContactRequestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ContactRequestUpdateInput, Prisma.ContactRequestUncheckedUpdateInput>;
};
export type ContactRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContactRequestSelect<ExtArgs> | null;
    omit?: Prisma.ContactRequestOmit<ExtArgs> | null;
    where: Prisma.ContactRequestWhereUniqueInput;
};
export type ContactRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContactRequestWhereInput;
    limit?: number;
};
export type ContactRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContactRequestSelect<ExtArgs> | null;
    omit?: Prisma.ContactRequestOmit<ExtArgs> | null;
};
