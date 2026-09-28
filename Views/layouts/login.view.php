<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar sesión - BoralPanel</title>
    <link rel="stylesheet" href="../../Css/global.css">
    <script>
        window.API_CONFIG ={ API_URL : <?= json_encode($_ENV['API_URL']) ?>};
        window.APP_CONFIG ={ APP_URL : <?= json_encode($_ENV['APP_URL']) ?>};
    </script>
    <script type ="module" src="../../Js/util.js" defer></script>
    <script type="module" src="../../Js/login.js" defer></script>
</head>

<body>

    <main class="login-container">

        <div class="login-card">

            <div class="logo">
                📦
            </div>

            <h1>BoralPanel</h1>

            <p class="subtitle">
                Inicia sesión para continuar
            </p>

            <form id="login-form">

                <div class="input-group">
                    <label for="email">Usuario</label>

                    <div class="input-container">
                        <span class="input-icon">👤</span>

                        <input
                            id="user"
                            name="user"
                            placeholder="Usuario123"
                            required
                        >
                    </div>
                </div>


                <div class="input-group">
                    <label for="password">Contraseña</label>

                    <div class="input-container">
                        <span class="input-icon">🔒</span>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••••"
                            required
                        >

                        <button
                            type="button"
                            class="show-password"
                            id="show-password"
                        >
                            👁
                        </button>
                    </div>
                </div>


                <div class="remember-container">

                    <label class="remember">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                        >

                        <span>Recordarme</span>
                    </label>

                </div>


                <button class="login-button">
                    <span>↪</span>
                    Iniciar sesión
                </button>

            </form>

        </div>

    </main>

    <?php require "Views/partials/notification.view.php" ?>
</body>
</html>