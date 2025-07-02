export interface Authorization {
    getPolicies(): Promise<string[][]>;
    createPolicies(policies: { subject: string; resource: string; action: string }[]): Promise<void>;
    updatePolicy(
        currentPolicy: { subject: string; resource: string; action: string },
        newPolicy: { subject: string; resource: string; action: string },
    ): Promise<void>;
    hardDeletePolicy(currentPolicy: { subject: string; resource: string; action: string }): Promise<void>;
    hasPolicy(currentPolicy: { subject: string; resource: string; action: string }): Promise<boolean>;
    checkPermission(
        subject: {
            name: string;
            role: string;
        },
        resource: string,
        action: string,
    ): Promise<boolean>;
    checkSharedEndpointPermission(
        subject: {
            name: string;
            role: string;
        },
        resource: string,
        action: string,
    ): Promise<boolean>;
}
