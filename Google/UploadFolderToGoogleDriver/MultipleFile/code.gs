/*
- Step 1: Create a new folder in Google Drive and set it public.
- Step 2: Create a new Google Apps Script.
- Step 3: Copy the function doPost() below then save it.
- Step 4: Deploy as web app to get API_URL
*/


function doPost(request) {
  const files = JSON.parse(request.postData.contents)
  const folderId = "1eWle6HBt-Sy-c6n-uXIrBDQP_UzvN7O7"; // Thay đổi id của thư mục cần lưu file tại đây
  const folder = DriveApp.getFolderById(folderId);
  const output = []
  files.forEach((file,index)=> {
  const datafile = Utilities.base64Decode(file.data);
  const blob = Utilities.newBlob(datafile, file.type, file.name);
  const newFile = folder.createFile(blob);
  const url = newFile.getUrl();
  const id = newFile.getId();
  output[index] = { status: "success", name: file.name, id: id, view: url, link: `https://lh3.googleusercontent.com/d/${id}`}
  }) // Link img kích thước gốc thêm vào =s500 để đặt kích thước nhỏ lại còn 500 hoặc chiều rộng bất kì ví dụ: https://lh3.googleusercontent.com/d/${id}=s500
    // LINK: https://drive.google.com/thumbnail?id=${id} này cũng dùng đc mà kích thước mặt định là 220 xấu
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON); 
}