import React, { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";

import InputText from "../Custominput/InputText";
import InputFile from "../Custominput/InputFile";
import CustomTextarea from "../Custominput/CustomTextarea";
import InputContainer from "../Custominput/InputContainer";
import TemplateSection from "../TemplateSection/TemplateSection";

import { TemplateSectionFooter, InputWrap, LabelArea, CustomButton, InputAreaFooter, BackButton } from "./style";
import { tStepSecond } from "Types/Business";
import { AiFillLeftCircle } from "react-icons/ai";
type tProps = {
  value: tStepSecond;
  setValue: Dispatch<SetStateAction<tStepSecond>>;
  stepperController: (value: number) => void;
};

export default function StepSecond({ value, setValue, stepperController }: tProps): JSX.Element {
  const logoFileController = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const imageFileController = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const setpController = () => {
    // if (value.BusinessLicense !== null && value.ManagerEMail !== "" && value.ManagerName !== "" && value.ManagerPhone !== "" && value.URL !== "") {
    //   stepperController(1);
    // } else {
    //   Swal.fire("정보를 다시 확인해주세요.");
    // }
    stepperController(1);
  };

  const backController = () => {
    stepperController(-1);
  };

  return (
    <>
      <TemplateSection title="필수 정보" open={true}>
        <InputContainer title="채용 분야" description="">
          <div className="input">
            <InputText
              maxLength={60}
              placeholder="채용분야를 입력해주세요"
              value={value.Field}
              setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue((v) => {
                  return { ...v, Field: e.target.value };
                })
              }
            />
          </div>
        </InputContainer>

        <InputContainer title="채용 제목" description="">
          <div className="input">
            <InputText
              maxLength={60}
              placeholder="채용분야를 입력해주세요"
              value={value.Title}
              setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue((v) => {
                  return { ...v, Title: e.target.value };
                })
              }
            />
          </div>
        </InputContainer>

        <InputContainer title="회사 로고" description="">
          <InputFile fileController={logoFileController} />
        </InputContainer>

        <InputContainer title="채용 이미지" description="">
          <InputFile fileController={imageFileController} />
        </InputContainer>

        <InputContainer title="회사명" description="">
          <div className="input">
            <InputText
              maxLength={60}
              placeholder="예) Baobab Company"
              value={value.CompanyName}
              setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue((v) => {
                  return { ...v, CompanyName: e.target.value };
                })
              }
            />
          </div>
        </InputContainer>

        <InputContainer title="근무 지역" description="">
          <div className="input">
            <InputText
              maxLength={60}
              placeholder="예) 경기도 시흥시"
              value={value.Location}
              setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue((v) => {
                  return { ...v, Location: e.target.value };
                })
              }
            />
          </div>
        </InputContainer>

        <InputContainer
          title="채용 한줄 홍보 메시지"
          description={"소개·연봉·복지 등 짧게 홍보할 수 있는 문구를 입력해주세요. \n최대 30자까지 입력 할 수 있어요."}
        >
          <div className="input">
            <InputText
              maxLength={60}
              placeholder="예) 연봉 상위 10%"
              value={value.Message}
              setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue((v) => {
                  return { ...v, Message: e.target.value };
                })
              }
            />
          </div>
        </InputContainer>

        <InputContainer title="채용 설명" description="최대 100자 / 4줄 이내로 입력해주세요.">
          <div className="input">
            <CustomTextarea
              maxLength={100}
              placeholder="예) 우리 모두에게 필요한 커리어 플랫폼을 함께 만들어 가실 새로운 팀원을 기다립니다. 관심 있으신 분이라면 누구든지 환영해요. 😊"
              value={value.Description}
              setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue((v) => {
                  return { ...v, Description: e.target.value };
                })
              }
            />
          </div>
        </InputContainer>

        <InputContainer title="경력 여부" description="">
          <div className="input">
            <InputText
              maxLength={60}
              placeholder="예) 신입"
              value={value.Type}
              setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue((v) => {
                  return { ...v, Type: e.target.value };
                })
              }
            />
          </div>
        </InputContainer>

        <InputContainer title="채용 마감일" description="">
          <div className="input">
            <InputText
              maxLength={60}
              placeholder="예) 신입"
              value={value.EndDate}
              setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue((v) => {
                  return { ...v, EndDate: e.target.value };
                })
              }
            />
          </div>
        </InputContainer>

        <InputContainer title="인재상" description="회사에 필요한 인재상을 적어주세요.">
          <div className="input" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <InputText
              maxLength={60}
              placeholder="예) 신입"
              value={value.Type}
              setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue((v) => {
                  return { ...v, Type: e.target.value };
                })
              }
            />
            <InputText
              maxLength={60}
              placeholder="예) 신입"
              value={value.Type}
              setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue((v) => {
                  return { ...v, Type: e.target.value };
                })
              }
            />
            <InputText
              maxLength={60}
              placeholder="예) 신입"
              value={value.Type}
              setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue((v) => {
                  return { ...v, Type: e.target.value };
                })
              }
            />
          </div>
        </InputContainer>
      </TemplateSection>
      <div style={{ marginTop: "30px", marginBottom: "30px" }}>
        <TemplateSection title="추가 정보" open={false}>
          <InputContainer title="연봉 테이블" description="">
            <div className="input">
              <InputText
                maxLength={60}
                placeholder="예) 2500만원 ~ 29000만원"
                value={value.Salary}
                setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue((v) => {
                    return { ...v, Salary: e.target.value };
                  })
                }
              />
            </div>
          </InputContainer>

          <InputContainer title="소개 URL" description="">
            <div className="input">
              <InputText
                maxLength={60}
                placeholder="https://www.notion.so/baobab-tree/Baobab-661df2d661204d1b8cfef17797fee76b"
                value={value.InfoURL}
                setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue((v) => {
                    return { ...v, InfoURL: e.target.value };
                  })
                }
              />
            </div>
          </InputContainer>
        </TemplateSection>
      </div>
      <TemplateSectionFooter>
        <InputWrap>
          <LabelArea>
            <div>
              <BackButton onClick={backController}>
                <AiFillLeftCircle size={30} />
                <span style={{ paddingLeft: "10px" }}>뒤로가기</span>
              </BackButton>
            </div>
          </LabelArea>
          <InputAreaFooter className="footer">
            <div className="input">
              <CustomButton onClick={setpController}>다음</CustomButton>
            </div>
          </InputAreaFooter>
        </InputWrap>
      </TemplateSectionFooter>
    </>
  );
}
