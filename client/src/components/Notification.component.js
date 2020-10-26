import { toast } from 'react-toastify'
toast.configure()


class notification {
    notify = (txt, type) => {
      return toast[type](txt, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  universal(txt, type) {
    return this.notify(txt, type);
  }

}

export default new notification();