import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import MenuBottom from "./MenuBottom";
import Button from "./Button";
import { useRouter } from "next/router";

export default function Layout(props) {
  const { children, hideBottomMenu } = props;
  const router = useRouter();

  const schema = yup
  .object({
    name: yup.string().required('Nama wajib diisi'),
    telp: yup.string().test('len', 'Minimal 10 digit angka', val => val.toString().length >= 10).required('Whatsapp wajib diisi'),
    email: yup.string().email().required('Email wajib diisi'),
    birthDate: yup.string().required('Tanggal Lahir wajib diisi')
  })
  .required()

  const { register, control, formState: { errors }, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(schema)
  });

  const handleInputAllowOnlyNumber = (event) => {
    const cleanedValue = event.target.value.replace(/\D/g, '');
    setValue('telp', cleanedValue);
  };

  const onSubmit = async (data) => {
  }

  const handleLogin = async () => {
    const name = watch("name");
    const telp = watch("telp");
    if(name || telp) {
      localStorage.setItem('userDataName', watch("name"));
      localStorage.setItem('userDataTelp', watch("telp"));
      document.getElementById('modal_auth').close();
    }
  }

  useEffect(() => {
    const name = localStorage.getItem('userDataName');
    const telp = localStorage.getItem('userDataTelp');
    if(!name || !telp) {
      document.getElementById('modal_auth').showModal();
      router.push('/')
    }
  }, [])
  
  return (
    <div className={`mx-auto max-w-md bg-white min-h-screen ${!hideBottomMenu && `pb-20`}`}>
      {children}
      {
        !hideBottomMenu ? <MenuBottom /> : null
      }
      <dialog id="modal_auth" className="modal">
        <div className="modal-box">
         <form onSubmit={handleSubmit((e) => onSubmit(e))}>
            <h3 className="font-bold text-lg">Akses Masuk PKT UMKM Festival 2023</h3>
            <p className="p2-4">Silahkan isi formulir data diri kalian dengan benar, terutama nama dan nomor telepon aktif.</p>
            <div className="pt-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Nama Lengkap</span>
                </div>
                <input 
                  type="text" 
                  placeholder="Nama Anda" 
                  className="input input-bordered w-full" 
                  {...register("name")}
                />
                {!!errors.name &&
                  <div className="label">
                    <span className="label-text-alt text-error">{errors.name?.message}</span>
                  </div>
                || null
                }
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Whatsapp</span>
                </div>
                <Controller
                  name="telp"
                  control={control}
                  defaultValue=""
                  render={({ field }) => 
                  <input 
                    {...field}
                    type="string" 
                    placeholder="ex: 08123267002" 
                    className="input input-bordered w-full" 
                    onChange={handleInputAllowOnlyNumber}
                  />
                  }
                />
                {!!errors.telp &&
                  <div className="label">
                    <span className="label-text-alt text-error">{errors.telp?.message}</span>
                  </div>
                || null
                }
              </label>
              <div className="modal-action">
                {/* <Button type="submit" className="w-full">Masuk</Button> */}
                <button className="btn btn-primary" onClick={handleLogin}>Masuk</button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
