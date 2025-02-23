import type { Config } from "@measured/puck";

type Props = {
  HeadingBlock: { title: string };
  FormBlock: {
    fields: {
      Label: string;
      Type: string;
      Placeholder?: string;
      Options?: { value: string; label: string }[];
    }[];
  };
};

export const config: Config<Props> = {
  components: {

    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1>{title}</h1>
        </div>
      ),
    },

    FormBlock: {
      fields: {
        fields: {
          type: "array",
          arrayFields: {
            Label: { type: "text" },
            Type: {
              type: "select",
              options: [
                { value: "text", label: "Text" },
                { value: "email", label: "Email" },
                { value: "textarea", label: "Textarea" },
                { value: "radio", label: "Radio Button" },
                { value: "check", label: "Checkbox"},
              ],
            },
            Placeholder: { type: "text" },
            Options: {
              type: "array",
              arrayFields: {
                value: { type: "text" },
                label: { type: "text" },
              },
            },
          },
        },
      },
      defaultProps: {
        fields: [
          {
            Label: "Text Field",
            Type: "text",
            Placeholder: "Enter Text",
          },
        ],
      },
      render: ({ fields }) => {
        return (
          <form>
            {fields.map((field, index) => (
              <div key={index} style={{ marginBottom: 20 }}>
                <label>{field.Label}</label>
                
                {field.Type === "textarea" && (
                  <textarea
                    placeholder={field.Placeholder}
                    style={{ width: "100%", padding: 8, marginTop: 8 }}
                  />
                )}

                {field.Type === "radio" && field.Options && (
                  <div>
                    {field.Options.map((option, i) => (
                      <label key={i} style={{ marginRight: 10 }}>
                        <input
                          type="radio"
                          name={field.Label}
                          value={option.value}
                        />{" "}
                        {option.label}
                      </label>
                    ))}
                  </div>
                )}

                {field.Type === "check" && field.Options && (
                  <div>
                    {field.Options.map((option, i) => (
                      <label key={i} style={{ marginRight: 10 }}>
                        <input
                          type="checkbox"
                          name={field.Label}
                          value={option.value}
                        />{" "}
                        {option.label}
                      </label>
                    ))}
                  </div>
                )}

                {field.Type !== "radio" &&
                  field.Type !== "textarea" &&
                  field.Type !== "check" && (
                    <input
                      type={field.Type}
                      placeholder={field.Placeholder}
                      style={{ width: "100%", padding: 8, marginTop: 8 }}
                    />
                )}

              </div>
            ))}
          </form>
        );
      },
    },

  },
};

export default config;