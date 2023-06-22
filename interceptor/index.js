import React, { Component } from "react";
import { getSession } from "next-auth/react";

class ApiClient extends React.Component {
  constructor() {
    super();
    this.state = {
      url: "",
      response: "",
      token: undefined,
      headers: {
        "Content-Type": "application/json",
      },
      data: null,
      auth: "",
      method: "GET",
    };
  }

  async auth() {
    let session = await getSession();
    if (session != null) {
      this.state.headers["Authorization"] =
        "Bearer " + session.token.accessToken;
    }

    if (this.state.token != undefined) {
      this.state.headers["Authorization"] =
        "Bearer " + this.state.token.accessToken;
    }
  }

  async res_status(res) {
    if (res.status == 401) {
      let data = await res.json();
      this.response = { error: "Yetkiniz yok" };
      return { success: false, data: this.response, res: data };
    }

    if (res.status == 400) {
      this.response = await res.json();
      return { success: false, data: this.response };
    }

    if (res.status == 403) {
      this.response = { error: "sunucuda hata 500" };
      return { success: false, data: this.response };
    }

    if (res.status == 404) {
      this.response = { error: "sunucuda hata 404" };
      return { success: false, data: this.response };
    }

    if (res.status == 500) {
      this.response = { error: "sunucuda hata 500" };
      return { success: false, data: this.response };
    }

    if (res.status == 200) {
      this.response = await res.json();
      return { success: true, data: this.response };
    }

    if (res.status == 201) {
      this.response = await res.json();
      return { success: true, data: this.response };
    }
    if (res.status == 204) {
      return { success: true };
    }
  }

  async progress(url) {
    await this.auth();
    let data = {
      headers: this.state.headers,
      method: this.state.method,
    };

    if (this.state.data != null) {
      data["body"] = JSON.stringify(this.state.data);
    }
    let res = await fetch(this.state.url + url, data);
    res = await this.res_status(res);
    return res;
  }

  async post(url) {
    this.state.method = "POST";
    await this.auth();
    let data = {
      headers: this.state.headers,
      method: this.state.method,
    };

    if (this.state.data != null) {
      data["body"] = JSON.stringify(this.state.data);
    }
    let res = await fetch(this.state.url + url, data);
    res = await this.res_status(res);
    return res;
  }

  async get(url) {
    await this.auth();
    this.state.method = "GET";
    let data = {
      headers: this.state.headers,
      method: this.state.method,
    };
    let res = await fetch(this.state.url + url, data);
    res = await this.res_status(res);
    return res;
  }

  async delete(url) {
    await this.auth();
    this.state.method = "DELETE";
    let data = {
      headers: this.state.headers,
      method: this.state.method,
    };

    if (this.state.data != null) data["body"] = JSON.stringify(this.state.data);

    let res = await fetch(this.state.url + url, data);
    res = await this.res_status(res);
    return res;
  }

  async put(url) {
    this.state.method = "PUT";
    await this.auth();
    let data = {
      headers: this.state.headers,
      method: this.state.method,
    };

    if (this.state.data != null) {
      data["body"] = JSON.stringify(this.state.data);
    }

    let res = await fetch(this.state.url + url, data);
    res = await this.res_status(res);
    return res;
  }

  async fileUpload(file, type) {
    this.state.method = "POST";
    let formData = new FormData();
    formData.append("type", type);
    formData.append("file", file);
    formData.append("slug", "file");

    const res = await fetch(this.state.url + "upload/", {
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
      method: this.state.method,
      body: formData,
    });

    if (res.status === 201 || res.status === 200) {
      this.response = await res.json();
      return { success: true, data: this.response };
    } else {
      this.response = {
        title: "Başarısız",
        message: "Hata oluşmuştur",
        status: "error",
        data: await res.json(),
      };
    }
    return this.response;
    // if (res.status === 201) {
    //     this.response = await res.json();
    //     await Swal.fire({
    //         title: this.response.title,
    //         text: this.response.message,
    //         icon: this.response.status,
    //         customClass: 'swal-custom',
    //         toast: true,
    //         timerProgressBar: true,
    //         position: 'top-end',
    //         showConfirmButton: false,
    //         timer: 2000,
    //     })
    // } else {
    //     this.response = {
    //         'title': 'Başarısız',
    //         'message': 'Hata oluşmuştur',
    //         'status': 'error'
    //     }
    //     await Swal.fire({
    //         title: this.response.title,
    //         text: this.response.message,
    //         icon: this.response.status,
    //         customClass: 'swal-custom',
    //         toast: true,
    //         timerProgressBar: true,
    //         position: 'top-end',
    //         showConfirmButton: false,
    //         timer: 2000,
    //     })
    // }
    // return this.response
  }
}

export default ApiClient;
