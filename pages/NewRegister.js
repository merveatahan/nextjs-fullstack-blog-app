import { useForm } from "react-hook-form";

export default function NewRegister() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          defaultValue="Full Name"
          {...register("fullname", { required: true })}
        />

        {/* include validation with required or other standard HTML validation rules */}
        <input
          defaultValue="E-Mail"
          {...register("email", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.email && <span>This field is required</span>}
        <input {...register("password", { required: true })} />
        <input type="submit" />
      </form>
    </div>
  );
}
