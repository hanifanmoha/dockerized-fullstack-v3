function FieldError({ errors }: { errors: any[] }) {
    if (errors.length === 0) return null

    return <span className="text-red-500 text-xs">
        {errors.join(', ')}
    </span>
}

export default FieldError