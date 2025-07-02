export class NotFoundError extends Error {
    public static model = (modelName: string, fieldName: string, value: string): NotFoundError =>
        new NotFoundError(`${modelName} is not found. ${fieldName}: ${value}`);
}
