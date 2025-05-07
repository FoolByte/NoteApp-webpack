import Swal from "sweetalert2";

const BASE_URL = "https://notes-api.dicoding.dev/v2/notes";

export async function fetchNotes() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Respon jaringan tidak baik");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Koneksi Bermasalah!",
      text: "Gagal menampilkan catatan. Silakan periksa koneksi Anda atau coba lagi nanti.",
      icon: "error",
      confirmButtonText: "OK ",
    });
  }
}

export async function addNote({ title, body }) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });
    if (!response.ok) {
      throw new Error("Respon jaringan tidak baik");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    Swal.fire({
      title: "Koneksi Bermasalah!",
      text: "Gagal menambahkan catatan. Silakan periksa koneksi Anda atau coba lagi nanti.",
      icon: "error",
      confirmButtonText: "OK ",
    });
  }
}

export async function deleteNote(noteId) {
  try {
    const response = await fetch(`${BASE_URL}/${noteId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Respon jaringan tidak baik");
    }
    const data = await response.json();
    if (data.status === "success") {
      Swal.fire({
        title: "Catatan berhasil dihapus.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
      return true;
    }

    throw new Error("Gagal menghapus catatan.");
  } catch (error) {
    Swal.fire({
      title: "Koneksi Bermasalah!",
      text: "Gagal menghapus catatan. Silakan periksa koneksi Anda atau coba lagi nanti.",
      icon: "error",
      confirmButtonText: "OK ",
    });
  }
}

export const archiveNote = (noteId) => {
  return fetch(`${BASE_URL}/${noteId}/archive`, {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        Swal.fire({
          title: "Catatan diarsipkan",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        return data.message;
      } else {
        console.error("Gagal mengarsipkan catatan:", data.message);
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      Swal.fire({
        title: "Koneksi Bermasalah!",
        text: error,
        icon: "error",
        confirmButtonText: "OK ",
      });
    });
};
