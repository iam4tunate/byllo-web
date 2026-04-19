const ErrorMsg = ({ error }: { error: string }) => {
  return (
    <div className="p-4 bg-red-100 border border-red-500 text-red-500 font-medium rounded-md text-sm text-center">
      {error}
    </div>
  )
}
export default ErrorMsg