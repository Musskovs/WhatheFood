import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { Grid } from '@material-ui/core';
import ApiReceitas from "../../services/ApiReceitas";

const CadastroReceitas = () => {

  return (
    <div>
      <Formik
        initialValues={{
          titulo: "",
          refeicao: "cafe",
          tipo: "rapida",
          ingredientes: [{nome:''}],
          instrucoes: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.titulo) {
            errors.titulo = "Obrigatório";
          }
          if (!values.refeicao) {
            errors.refeicao = "Obrigatório";
          }
          if (!values.tipo) {
            errors.tipo = "Obrigatório";
          }
          values.ingredientes.forEach((ingrediente) => {
            if (ingrediente.length === 0) {
              errors.ingredientes =
                "Um ou mais ingredientes foram deixados em branco";
            }
          });
          if (!values.instrucoes) {
            errors.instrucoes = "Obrigatório";
          }
          return errors;
        }}
        onSubmit={(values, onSubmitProps) => {
          setTimeout(() => {
            ApiReceitas.post("receitas/inserir", values).catch(function (error) {
              console.log(error);
            });
            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();
          }, 400);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <h2 className="titulo-form">Receita</h2>

            <div className="Form-Item">
            <label htmlFor="titulo" className="label-input">Título</label>
              <Field name="titulo" placeholder="Título" type="text" />
              <ErrorMessage name="titulo" component="div" className="error" />
            </div>

            <div className="Form-Item">
              <label htmlFor="refeicao" className="label-input">Refeição</label>
              <Field name="refeicao" as="select">
                <option value="cafe">Café da Manhã</option>
                <option value="almoco">Almoço ou Janta</option>
                <option value="lanche">Lanche</option>
                <option value="sobremesa">Sobremesa</option>
              </Field>
              <ErrorMessage name="refeicao" component="div" className="error" />
            </div>

            <div className="Form-Item">
              <label htmlFor="tipo" className="label-input">Tipo</label>
              <Field name="tipo" as="select">
                <option value="rapida">Rápida</option>
                <option value="gourmet">Gourmet</option>
                <option value="leve">Leve</option>
              </Field>
              <ErrorMessage name="tipo" component="div" className="error" />
            </div>

            <div className="Form-Item">
              <label htmlFor="ingredientes" className="label-input">Lista de Ingredientes</label>
              <FieldArray
                name="ingredientes"
                render={(arrayHelpers) => (
                  <div>
                      {values.ingredientes.map((ingrediente, index) => (
                        <Grid container direction="row" key={index}>
                          <Grid item xs={11}>
                            <Field name={`ingredientes.${index}.nome`} value={ingrediente.nome} className="list-item"/>
                          </Grid>

                          <Grid item xs={1}>
                            <button type="button" onClick={() => arrayHelpers.remove(index)} className="remove-button">
                              X
                            </button>
                          </Grid>
                        </Grid>
                      ))}
                    <ErrorMessage name="ingredientes" component="div" className="error"/>
                    <button type="button" onClick={() => arrayHelpers.push({nome: ''})} className="add-button">
                      Adicionar Ingrediente
                    </button>
                  </div>
                )}
              />
            </div>

            <div>
              <label htmlFor="instrucoes" className="label-input">Instruções</label>
              <Field name="instrucoes" as="textarea" placeholder="Instruções" />
              <ErrorMessage name="instrucoes" component="div" className="error"/>
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-button">
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CadastroReceitas;
