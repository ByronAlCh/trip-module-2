# trip-module-2

|  HTTP Method | URL path                                  | Description                              | JSON |
|--------------|-------------------------------------------|------------------------------------------|------|
| GET          | `/`                                        | Index page                               |      |
| GET          | `/paises`                                   | countries list                           |      |
| GET          | `/paises/detalles/:pais_id`                 | country details                          |      |
| GET          | `/paises/detalles/detalles-cholon/:pais_id` | country details full 4K                  |      |
| GET          | `/guia-viajes`                              | Trip list                                |      |
| GET          | `/guia-viajes/crear`                        | Create Trip                              |      |
| POST         | `/guia-viajes/crear`                        | Create Trip                              |      |
| GET          | `/guia-viajes/edit/:viaje_id`               | Edit Trip                                |      |
| GET          | `/guia-viajes/edit/:viaje_id`               | Edit Trip                                |      |
| POST         | `/guia-viajes/eliminar/:viaje_id`           | Eliminate Trip                           |      |
| GET          | `/guia-viajes/:viaje_id/details`            | Details Trip, maps and comments          |      |
| POST         | `/guia-viajes/:viaje_id/details`            | Response Comments                        |      |
| GET          | `/guia-viajes/:viaje_id/:admin_id`          | Edit and eliminate comments (only Admin) |      |
| GET          | `/perfil/:id`                               | profile details                          |      |
| GET          | `/perfil/:id/editar`                        | Edit profile                             |      |
| POST         | `/perfil/:id/editar`                        | Edit profile                             |      |
| POST         | `/perfil/:id/eliminar`                      | Eliminate profile                        |      |
| GET          | `/registrarse`                              | Login                                    |      |
| POST         | `/registrarse`                              | Login                                    |      |
| GET          | `/inicio-sesion`                            | Signup                                   |      |
| POST         | `/inicio-sesion`                            | Signup                                   |      |
| GET          | `/cerrar-sesion`                            | Signout                                  |      |
| GET          | `/api/google-maps`                          | Maps                                     |      |
| GET          | `/api/google-place`                         | Details                                  |      |
| GET          | `/api/country-state-city`                   | More Details                             |      |