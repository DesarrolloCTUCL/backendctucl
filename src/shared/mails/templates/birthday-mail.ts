export class BirthdayMail {
  private name: string;
  private business_name: string;
  private business_logo: string;

  constructor(name: string, business_name: string, business_logo: string) {
    this.name = name;
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
                src="${this.business_logo}"
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
              <td style="
                      box-sizing: border-box;
                      padding: 0;
                      font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica',
                        Helvetica, Arial, sans-serif;
                      font-size: 16px;
                      vertical-align: top;
                      text-align: center;
                    " valign="top">
                <div style="font-size: 24px; margin-bottom: 20px;">
                  🎉 🎂 🎈
                </div>
                <p style="
                        margin-bottom: 10px;
                        color: #1E40AF;
                        font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica',
                          Helvetica, Arial, sans-serif;
                        font-size: 24px;
                        font-weight: 600;
                        text-align: center;
                      ">
                  ¡Feliz Cumpleaños, ${this.name}!
                </p>
                <p style="
                        margin-bottom: 20px;
                        color: #4B5563;
                        font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica',
                          Helvetica, Arial, sans-serif;
                        font-size: 16px;
                        font-weight: 300;
                        text-align: center;
                      ">
                  En este día tan especial, queremos desearte un cumpleaños 
                  lleno de alegría y éxitos. Gracias por confiar en ${this.business_name} 
                  para alcanzar tus metas y objetivos.
                  <br /><br />
                </p>

                <p style="
                        margin-bottom: 10px;
                        color: #4B5563;
                        font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica',
                          Helvetica, Arial, sans-serif;
                        font-size: 16px;
                        font-weight: 300;
                        text-align: center;
                      ">
                  ¡Que tengas un día maravilloso!
                  <br /><br />
                  Con cariño,<br />
                  El equipo de ${this.business_name}
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
              © 2025 DIGO S.A.S.
              <br />Quito, Distrito Metropolitano, Av. República del Salvador
              406 y Moscú<br /><a
                href="https://www.simtra.app"
                style="color: #1e40af; text-decoration: none"
                >www.subly.digoai.app</a
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
