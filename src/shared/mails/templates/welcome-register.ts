export class WelcomeMailRegister {
  private name: string;
  private email: string;
  private business_name: string;
  private business_logo: string;


  constructor(
    name: string,
    email: string,
    business_name: string,
    business_logo: string,
  ) {
    this.name = name;
    this.email = email;

    this.business_name = business_name;
    this.business_logo = business_logo;
  }

  getHtml() {
    return `
<div
  style="
    box-sizing: border-box;
    display: block;
    max-width: 600px;
    margin: 0 auto;
    padding: 10px;
    background-color: #ffffff;
  "
>
  <div
    style="
      box-sizing: border-box;
      width: 100%;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
    "
  >
    <table
      style="
        box-sizing: border-box;
        width: 100%;
        border-spacing: 0;
        border-collapse: separate !important;
        padding-top: 1rem;
      "
      width="100%"
    >
      <tbody>
        <tr>
          <td
            style="
              font-size: 1rem;
              text-align: center;
              padding: 20px 0;
              display: block;
            "
          >
            <div>
              <img
                src=${this.business_logo}
                width="120"
                alt="Logo de ${this.business_name}"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td
            style="
              box-sizing: border-box;
              font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica,
                Arial, sans-serif;
              font-size: 16px;
              vertical-align: top;
              padding: 30px;
            "
            valign="top"
          >
            <table
              style="
                box-sizing: border-box;
                width: 100%;
                border-spacing: 0;
                border-collapse: separate !important;
              "
              width="100%"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      box-sizing: border-box;
                      padding: 0;
                      font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica',
                        Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      vertical-align: top;
                    "
                    valign="top"
                  >
                    <p
                      style="
                        margin-bottom: 10px;
                        color: #4b5563;
                        font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica',
                          Helvetica, Arial, sans-serif;
                        font-size: 16px;
                        font-weight: 300;
                        text-align: justify;
                      "
                    >
                      Hola ${this.name},
                      <br /><br />
                      Bienvenido a ${this.business_name}. Estamos muy emocionados de
                      tenerte en nuestro equipo de trabajo.
                      <br /><br />
                    </p>

                    <p
                      style="
                        margin-bottom: 10px;
                        color: #1e40af;
                        font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica',
                          Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 600;
                      "
                    >
                      Tus datos de acceso:
                    </p>

                    <table
                      style="width: 100%; color: #4b5563; margin-bottom: 20px"
                    >
                      <tr>
                        <td style="padding: 5px 0">
                          <strong>Usuario:</strong>
                        </td>
                        <td style="padding: 5px 0">
                          ${this.email}
                        </td>
                      </tr>
                    </table>

                    <p
                      style="
                        text-align: center;
                        margin-top: 30px;
                        margin-bottom: 30px;
                      "
                    >
                      <a
                        href="https://www.simtra.app"
                        style="
                          background-color: #1e40af;
                          color: #ffffff;
                          text-decoration: none;
                          padding: 12px 24px;
                          border-radius: 5px;
                          font-weight: bold;
                          display: inline-block;
                        "
                      >
                        Acceder a mi cuenta
                      </a>
                    </p>

                    
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div
    style="box-sizing: border-box; clear: both; width: 100%; margin-top: 20px"
  >
    <table
      style="
        box-sizing: border-box;
        width: 100%;
        border-spacing: 0;
        font-size: 12px;
        border-collapse: separate !important;
        background-color: #f3f4f6;
        padding: 1rem;
        border-radius: 8px;
      "
      width="100%"
    >
      <tbody>
        <tr style="font-size: 12px">
          <td
            align="center"
            style="
              box-sizing: border-box;
              font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica,
                Arial, sans-serif;
              vertical-align: top;
              font-size: 12px;
              text-align: center;
            "
            valign="top"
          >
            <p
              style="
                margin: 0;
                color: #6b7280;
                font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica',
                  Helvetica, Arial, sans-serif;
                font-weight: 300;
                font-size: 12px;
                padding-top: 0.5rem;
              "
            >
              © 2025 Consorcio de transporte Urbabo Ciudad de Loja.
              <br />Av universitaria, Entre Vicente Rocafuerte y Pasaje de la Feue
              406 y Moscú<br /><a
                href="https://www.simtra.app"
                style="color: #1e40af; text-decoration: none"
                >www.simtra.app</a
              >
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
    `;
  }
}
