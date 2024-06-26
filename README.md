```
src/
├── config/
│ ├── config.ts
│ └── database.ts
├── controllers/
│ ├── authController.ts
│ └── userController.ts
├── middleware/
│ ├── authMiddleware.ts
│ └── errorMiddleware.ts
├── models/
│ ├── User.ts
│ └── Course.ts
├── routes/
│ ├── authRoutes.ts
│ └── userRoutes.ts
├── services/
│ ├── authService.ts
│ └── userService.ts
├── utils/
│ ├── emailUtils.ts
│ └── tokenUtils.ts
├── app.ts
└── server.ts
```

### TODO LIST

# auth

1. register with email, username, password, otp
2. register with numberphone, username, otp
3. register with social (gg,github)
4. login with email, password
5. login with number phone, otp
6. forgot password, reset password

# authentication

người dùng có thể xem trang chủ nhưng khi tham gia khóa học bắt buộc phải login

# course

-   nội dung khóa học, thumbnail, tên khóa học, rating, reviews
-   có nhiều lesson trong khóa học được xếp trong các chapters
-   trạng thái hoàn thành khóa học, nhận certificate từ khóa học dưới dạng pdf padge

# lesson

-   có các video url
-   tên bài học
-   quiz test câu hỏi
-   bình luận trong từng bài học
