package main

// func init() {

// 	handlerOpts := &slog.HandlerOptions{
// 		Level: slog.LevelDebug,
// 	}

// 	logger := slog.New(slog.NewJSONHandler(os.Stderr, handlerOpts))
// 	slog.SetDefault(logger)

// 	// 1.
// 	// slog.Error("Order submitted")
// 	// slog.Info("Order submitted", slog.String("user", "johndoe"), slog.Int("id", 3))

// 	// 2.
// 	// userGroup := slog.Group("users", "id", 2, "username", "johndoe")
// 	// reqGroup := slog.Group("req", "id", 2, "method", "get")
// 	// slog.Info("Order submitted", userGroup, reqGroup)

// 	// 3.
// 	reqGroup := slog.Group("req", "id", 2, "method", "get")
// 	reqLogger := logger.With(reqGroup)

// 	reqLogger.Info("Order submitted")

// }
