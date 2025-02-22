import type { Config } from "@measured/puck";

type Props = {
  HeadingBlock: { title: string };
  FormBlock: {
    fields: {
      label: string;
      type: string;
      placeholder?: string;
      options?: { value: string; label: string }[];
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
            label: { type: "text" },
            type: {
              type: "select",
              options: [
                { value: "text", label: "Text" },
                { value: "email", label: "Email" },
                { value: "textarea", label: "Textarea" },
                { value: "radio", label: "Radio" },
              ],
            },
            placeholder: { type: "text" },
            options: {
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
            label: "Text Field",
            type: "text",
            placeholder: "Enter text",
          },
        ],
      },
      render: ({ fields }) => {
        return (
          <form>
            {fields.map((field, index) => (
              <div key={index} style={{ marginBottom: 20 }}>
                <label>{field.label}</label>
                
                {field.type === "textarea" && (
                  <textarea
                    placeholder={field.placeholder}
                    style={{ width: "100%", padding: 8, marginTop: 8 }}
                  />
                )}

                {field.type === "text" && (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    style={{ width: "100%", padding: 8, marginTop: 8 }}
                  />
                )}

                {field.type === "email" && (
                  <input
                    type="email"
                    placeholder={field.placeholder}
                    style={{ width: "100%", padding: 8, marginTop: 8 }}
                  />
                )}

                {field.type === "radio" && field.options && (
                  <div>
                    {field.options.map((option, i) => (
                      <label key={i} style={{ marginRight: 10 }}>
                        <input
                          type="radio"
                          name={field.label}
                          value={option.value}
                        />{" "}
                        {option.label}
                      </label>
                    ))}
                  </div>
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
