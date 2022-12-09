import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import InputText from "../Custominput/InputText";
import InputFile from "../Custominput/InputFile";
import CustomTextarea from "../Custominput/CustomTextarea";
import InputContainer from "../Custominput/InputContainer";
import TemplateSection from "../TemplateSection/TemplateSection";

import { TemplateSectionFooter, InputWrap, LabelArea, CustomButton, InputAreaFooter, BackButton, CheckBoxBtn } from "./style";
import { tStepSecond } from "Types/Business";
import { AiFillLeftCircle } from "react-icons/ai";
import LocationSelector from "components/LocationSelector/LocationSelector";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

import checkImg from "../../../assets/selected.png";
import moment from "moment";

import Select from "react-select";
import { JOB_GROUP } from "constants/index";
import { tJob } from "Types/Jobs";

type tProps = {
  value: tStepSecond;
  setValue: Dispatch<SetStateAction<tStepSecond>>;
  stepperController: (value: number) => void;
};

type tLabel = { value: string | number; label: string };
const formatOptionLabel = ({ value, label }: tLabel) => (
  <div style={{ display: "flex", color: "black" }}>
    <div>{label}</div>
  </div>
);

export default function StepSecond({ value, setValue, stepperController }: tProps): JSX.Element {
  const location: any = useLocation();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isDate, setIsDate] = useState<boolean>(true);
  const [careerType, setCareerType] = useState<number>(0);
  const [talent, setTalent] = useState<string[]>(["", "", ""]);
  const [job, setJob] = useState<tLabel>(JOB_GROUP[0]);

  const setpController = () => {
    if (
      value.CompanyLogo !== null &&
      value.CompanyName !== "" &&
      value.Message !== "" &&
      value.Field !== "" &&
      value.InfoURL !== "" &&
      value.Location !== "" &&
      value.Salary !== "" &&
      value.talent !== ",," &&
      value.Title !== ""
    ) {
      stepperController(1);
    } else {
      Swal.fire("정보를 다시 확인해주세요.");
    }
  };

  const backController = () => {
    stepperController(-1);
  };

  const locationHandler = (locaton: string) => {
    setValue((v) => {
      return { ...v, Location: locaton };
    });
  };

  const logoFileController = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setValue((v) => {
        return {
          ...v,
          CompanyLogo: null,
        };
      });

      setValue((v) => {
        return {
          ...v,
          CompanyLogo: e.target.files,
        };
      });
    }
  };

  const imageFileController = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setValue((v) => {
        return {
          ...v,
          Image: e.target.files,
        };
      });
    }
  };

  const ExampleCustomInput = React.forwardRef(({ value, onClick }: any, ref: any) => (
    <button style={{ color: "white" }} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const talentHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const arr = [...talent];
    arr[index] = e.target.value;
    setTalent(arr);
  };

  const jobHandler = (props: any) => {
    setJob(props.value);
  };

  useEffect(() => {
    const date = isDate ? null : moment(startDate).format("YYYYMMDD");
    console.log("st", date);
    setValue((v) => {
      return { ...v, StartDate: date };
    });
  }, [startDate, isDate]);

  useEffect(() => {
    const date = isDate ? null : moment(endDate).format("YYYYMMDD");
    console.log("end", date);

    setValue((v) => {
      return { ...v, EndDate: date };
    });
  }, [endDate, isDate]);

  useEffect(() => {
    setValue((v) => {
      return { ...v, Type: careerType };
    });
  }, [careerType]);

  useEffect(() => {
    setValue((v) => {
      return { ...v, talent: talent.join(",") };
    });
  }, [talent]);

  useEffect(() => {
    setValue((v) => {
      return { ...v, Field: job.label };
    });
  }, [job]);

  useEffect(() => {
    if (location.state !== null) {
      const data: tJob = location.state.data;
      const techStack = JOB_GROUP.find((q) => q.label === data.field);
      setJob(techStack!);

      const dateFnc = (datetmp: string): Date => {
        const y = parseInt(datetmp.slice(0, 4));
        const m = parseInt(datetmp.slice(4, 6));
        const d = parseInt(datetmp.slice(6, 8));

        return new Date(`${y}-${m}-${d}`);
      };
      if (data.startDate !== null) {
        const start: Date = dateFnc(data.startDate);
        setStartDate(start);
      }
      if (data.endDate !== null) {
        const end: Date = dateFnc(data.endDate);
        setEndDate(end);
      }
      if (data.startDate === null || data.startDate === "null") {
        setIsDate(true);
      } else {
        setIsDate(false);
      }

      setTalent(data.talent.split(","));
      setCareerType(data.careerType);
      // console.log(data);
    }
  }, []);

  return (
    <>
      <TemplateSection title="필수 정보" open={true}>
        <InputContainer title="채용 분야" description="">
          <div className="input">
            <Select value={job} options={JOB_GROUP} formatOptionLabel={formatOptionLabel} onChange={jobHandler} />
          </div>
        </InputContainer>

        <InputContainer title="채용 제목" description="">
          <div className="input">
            <InputText
              maxLength={60}
              placeholder="채용 제목를 입력해주세요"
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
            <LocationSelector value={value.Location} setValue={locationHandler} />
          </div>
        </InputContainer>

        <InputContainer title="채용 설명" description="최대 100자 / 4줄 이내로 입력해주세요.">
          <div className="input">
            <CustomTextarea
              maxLength={100}
              placeholder="예) 우리 모두에게 필요한 커리어 플랫폼을 함께 만들어 가실 새로운 팀원을 기다립니다. 관심 있으신 분이라면 누구든지 환영해요. 😊"
              value={value.Message}
              setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue((v) => {
                  return { ...v, Message: e.target.value };
                })
              }
            />
          </div>
        </InputContainer>

        <InputContainer title="경력 여부" description="">
          <div style={{ display: "flex", gap: "15px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <CheckBoxBtn onClick={() => setCareerType(0)}>{careerType === 0 && <img src={checkImg} alt="aa" style={{ width: "100%" }} />}</CheckBoxBtn>
              <p>경력 무관</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <CheckBoxBtn onClick={() => setCareerType(1)}>{careerType === 1 && <img src={checkImg} alt="aa" style={{ width: "100%" }} />}</CheckBoxBtn>
              <p>인턴</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <CheckBoxBtn onClick={() => setCareerType(2)}>{careerType === 2 && <img src={checkImg} alt="aa" style={{ width: "100%" }} />}</CheckBoxBtn>
              <p>신입</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <CheckBoxBtn onClick={() => setCareerType(3)}>{careerType === 3 && <img src={checkImg} alt="aa" style={{ width: "100%" }} />}</CheckBoxBtn>
              <p>경력</p>
            </div>
          </div>
        </InputContainer>

        <InputContainer title="채용 기간" description="">
          <div className="input">
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <CheckBoxBtn onClick={() => setIsDate(true)}>{isDate && <img src={checkImg} alt="aa" style={{ width: "100%" }} />}</CheckBoxBtn>
                <p>상시 채용</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <CheckBoxBtn onClick={() => setIsDate(false)}>{!isDate && <img src={checkImg} alt="aa" style={{ width: "100%" }} />}</CheckBoxBtn>
                <p>채용 기간 설정</p>
              </div>
            </div>

            {!isDate && (
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  padding: "15px",
                  border: "1px solid #35363b",
                  borderRadius: "9px",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <div>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date!)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy년 MM월 dd일"
                    locale={ko}
                    customInput={<ExampleCustomInput />}
                  />
                </div>
                <div style={{ width: "10px", height: "2px", background: "#35363b" }}></div>
                <div>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date!)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="yyyy년 MM월 dd일"
                    locale={ko}
                    customInput={<ExampleCustomInput />}
                  />
                </div>
              </div>
            )}
          </div>
        </InputContainer>

        <InputContainer title="인재상" description="회사에 필요한 인재상을 적어주세요.">
          <div className="input" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <InputText
              maxLength={60}
              placeholder="인재상을 입력해주세요."
              value={talent[0]}
              setValue={(e: React.ChangeEvent<HTMLInputElement>) => talentHandler(e, 0)}
            />
            <InputText
              maxLength={60}
              placeholder="인재상을 입력해주세요."
              value={talent[1]}
              setValue={(e: React.ChangeEvent<HTMLInputElement>) => talentHandler(e, 1)}
            />
            <InputText
              maxLength={60}
              placeholder="인재상을 입력해주세요."
              value={talent[2]}
              setValue={(e: React.ChangeEvent<HTMLInputElement>) => talentHandler(e, 2)}
            />
          </div>
        </InputContainer>
      </TemplateSection>
      <div style={{ marginTop: "30px", marginBottom: "30px" }}>
        <TemplateSection title="추가 정보" open={false}>
          <InputContainer title="연봉 테이블" description="">
            <div className="input" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <InputText
                maxLength={60}
                placeholder="예) 3800"
                value={value.Salary}
                setValue={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!isNaN(Number(e.target.value))) {
                    setValue((v) => {
                      return { ...v, Salary: e.target.value.trim() };
                    });
                  }
                }}
              />
              <p>만원</p>
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
