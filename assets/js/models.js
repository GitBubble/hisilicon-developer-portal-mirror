// Generated from api_all_models.json and api_all_details.json
const modelsData = [
    {
        "id": "kuerjmbgts00",
        "name": "YOLOv4",
        "description": "YOLOv4 是一种高性能的 one-stage 目标检测模型。相比 YOLOv3，YOLOv4 采用了 CSPDarknet53 作为 backbone 进行特征提取，该网络结合了跨金字塔池化结构和路径聚合网络，在精度和速度上均有显著提升。",
        "descriptionZh": "YOLOv4 是一种高性能的 one-stage 目标检测模型。相比 YOLOv3，YOLOv4 采用了 CSPDarknet53 作为 backbone 进行特征提取，该网络结合了跨金字塔池化结构和路径聚合网络，在精度和速度上均有显著提升。",
        "descriptionEn": "YOLOv4 is a computer vision model for object detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-09-15 09:27:15",
        "updatedAt": "2026-09-15 15:27:11",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "assets/images/1712131749773315_yolov4.jpg",
        "coverImageUrl": "assets/images/1712131749773315_yolov4.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/detection/yolov4",
        "licenseUrl": "https://github.com/Tianxiaomo/pytorch-YOLOv4/blob/master/License.txt",
        "quickStartUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/detection/yolov4",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // yolov4模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::yolov4) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/detection/yolov4/src/CMakeLists.txt)",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for YOLOv4. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "608x608"
            },
            {
                "name": "参数量",
                "value": "64.330M"
            },
            {
                "name": "计算量",
                "value": "157.842GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "252.58",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "3.96",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "488.841",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "119.559",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "415.57",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "2.41",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "2160.436",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "384.109",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "yolov4.pth",
                "size": "246 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov4/resolve/main/yolov4.pth",
                "available": true,
                "localFile": "yolov4.pth"
            },
            {
                "name": "yolov4.onnx",
                "size": "246 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov4/resolve/main/yolov4.onnx",
                "available": true,
                "localFile": "yolov4.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolov4",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov4",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov4/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov4/resolve/main/yolov4_dpico.om",
        "primaryDownloadLabel": "yolov4_dpico.om",
        "downloads": [
            {
                "title": "yolov4_dpico.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov4/resolve/main/yolov4_dpico.om",
                "available": true,
                "source": "om-A16W8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "yolov4_dpico.om",
                "performance": [
                    {
                        "value": "252.58",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "3.96",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "488.841",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "119.559",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov4_dlite_fp16.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov4/resolve/main/yolov4_dlite_fp16.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "yolov4_dlite_fp16.om",
                "performance": [
                    {
                        "value": "415.57",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "2.41",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "2160.436",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "384.109",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov4.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov4/resolve/main/yolov4.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov4.pth"
            },
            {
                "title": "yolov4.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov4/resolve/main/yolov4.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov4.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitcode.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "ku5e0eekj400",
        "name": "YOLO11s-pose",
        "description": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLO11网络模型是YOLO系列的最新版本，在继承了原有YOLO网络模型优点的基础上，在架构和训练方法上进行了重大改进，具有更高的检测精度、速度和效率。YOLO11s-pose作为YOLO11的姿态估计的模型，能检测出代表人体不同部位的17个关键点。该模型仅供学习使用，若集成到产品中，请联系原作者获取商用许可。",
        "descriptionZh": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLO11网络模型是YOLO系列的最新版本，在继承了原有YOLO网络模型优点的基础上，在架构和训练方法上进行了重大改进，具有更高的检测精度、速度和效率。YOLO11s-pose作为YOLO11的姿态估计的模型，能检测出代表人体不同部位的17个关键点。该模型仅供学习使用，若集成到产品中，请联系原作者获取商用许可。",
        "descriptionEn": "YOLO11s-pose is a computer vision model for pose estimation. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN, Hi3403V100 NNN, and Hi3516CV610. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-09-14 11:29:32",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "姿态估计"
        ],
        "image": "assets/images/1712135222657026_yolo11-pose-small.jpg",
        "coverImageUrl": "assets/images/1712135222657026_yolo11-pose-small.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN",
            "Hi3516CV610"
        ],
        "repositoryUrl": "https://gitcode.com/Hispark/modelzoo/tree/master/samples/samples_GPL/built-in/yolo11s-pose",
        "licenseUrl": "https://github.com/ultralytics/ultralytics/blob/master/LICENSE",
        "quickStartUrl": "https://gitcode.com/Hispark/modelzoo/tree/master/samples/samples_GPL/built-in/yolo11s-pose",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // yolo11s-pose模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::Yolo11s-pose) != 0) {\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitcode.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitcode.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolo11s-pose/src/CMakeLists.txt)。",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for YOLO11s-pose. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "640x640"
            },
            {
                "name": "参数量",
                "value": "9.970M"
            },
            {
                "name": "计算量",
                "value": "25.414GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "25.09",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "39.85",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "168.145",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "36.895",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "45.41",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "22.02",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "360.947",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "125.070",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3516CV610",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "169.063",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "5.92",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "35.199",
                        "unit": "内存（MB）",
                        "desc": ""
                    },
                    {
                        "value": "337.639",
                        "unit": "单帧内存带宽 (MB)",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolo11s-pose",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-pose",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-pose/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-pose/resolve/main/yolo11s-pose_928_SVPNNN_%E6%AD%A4%E6%96%87%E4%BB%B6%E4%BB%85%E4%BE%9B%E5%AD%A6%E4%B9%A0%E8%AF%84%E4%BC%B0%EF%BC%8C%E5%95%86%E7%94%A8%E9%9C%80%E8%81%94%E7%B3%BB%E5%8E%9F%E4%BD%9C%E8%80%85%E8%B4%AD%E4%B9%B0%E6%8E%88%E6%9D%83.om",
        "primaryDownloadLabel": "yolo11s-pose_928_SVPNNN_此文件仅供学习评估，商用需联系原作者购买授权.om",
        "downloads": [
            {
                "title": "yolo11s-pose_928_SVPNNN_此文件仅供学习评估，商用需联系原作者购买授权.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-pose/resolve/main/yolo11s-pose_928_SVPNNN_%E6%AD%A4%E6%96%87%E4%BB%B6%E4%BB%85%E4%BE%9B%E5%AD%A6%E4%B9%A0%E8%AF%84%E4%BC%B0%EF%BC%8C%E5%95%86%E7%94%A8%E9%9C%80%E8%81%94%E7%B3%BB%E5%8E%9F%E4%BD%9C%E8%80%85%E8%B4%AD%E4%B9%B0%E6%8E%88%E6%9D%83.om",
                "available": true,
                "source": "om-A16W8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "yolo11s-pose_928_SVPNNN_此文件仅供学习评估，商用需联系原作者购买授权.om",
                "performance": [
                    {
                        "value": "25.09",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "39.85",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "168.145",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "36.895",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolo11s-pose_928_NNN_此文件仅供学习评估，商用需联系原作者购买授权.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-pose/resolve/main/yolo11s-pose_928_NNN_%E6%AD%A4%E6%96%87%E4%BB%B6%E4%BB%85%E4%BE%9B%E5%AD%A6%E4%B9%A0%E8%AF%84%E4%BC%B0%EF%BC%8C%E5%95%86%E7%94%A8%E9%9C%80%E8%81%94%E7%B3%BB%E5%8E%9F%E4%BD%9C%E8%80%85%E8%B4%AD%E4%B9%B0%E6%8E%88%E6%9D%83.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "yolo11s-pose_928_NNN_此文件仅供学习评估，商用需联系原作者购买授权.om",
                "performance": [
                    {
                        "value": "45.41",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "22.02",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "360.947",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "125.070",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolo11s-pose_610_SVPNNN_此文件仅供学习评估，商用需联系原作者购买授权.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-pose/resolve/main/yolo11s-pose_610_SVPNNN_%E6%AD%A4%E6%96%87%E4%BB%B6%E4%BB%85%E4%BE%9B%E5%AD%A6%E4%B9%A0%E8%AF%84%E4%BC%B0%EF%BC%8C%E5%95%86%E7%94%A8%E9%9C%80%E8%81%94%E7%B3%BB%E5%8E%9F%E4%BD%9C%E8%80%85%E8%B4%AD%E4%B9%B0%E6%8E%88%E6%9D%83.om",
                "available": true,
                "source": "om-A16W8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3516CV610",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "yolo11s-pose_610_SVPNNN_此文件仅供学习评估，商用需联系原作者购买授权.om",
                "performance": [
                    {
                        "value": "169.063",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "5.92",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "35.199",
                        "unit": "内存（MB）",
                        "desc": ""
                    },
                    {
                        "value": "337.639",
                        "unit": "单帧内存带宽 (MB)",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitcode.com/HiSpark/Hi3516CV610/tree/tag_V2.0.0_Beta",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "ku5ckc88j400",
        "name": "YOLO26s",
        "description": "YOLO26s 是 Ultralytics YOLO 系列中的小型目标检测模型，适合在边缘设备上进行实时目标检测。该模型仅供学习使用，若集成到产品中，请联系原作者获取商用许可。",
        "descriptionZh": "YOLO26s 是 Ultralytics YOLO 系列中的小型目标检测模型，适合在边缘设备上进行实时目标检测。该模型仅供学习使用，若集成到产品中，请联系原作者获取商用许可。",
        "descriptionEn": "YOLO26s is a computer vision model for detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN, Hi3403V100 NNN, and Hi3516CV610. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-09-14 11:23:31",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "检测"
        ],
        "image": "assets/images/1764112203841537_yolo26.jpg",
        "coverImageUrl": "assets/images/1764112203841537_yolo26.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN",
            "Hi3516CV610"
        ],
        "repositoryUrl": "https://gitcode.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolo26s",
        "licenseUrl": "https://github.com/ultralytics/ultralytics/blob/main/LICENSE",
        "quickStartUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolo26s/doc/快速开始.md",
        "quickStartMarkdownUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov10s/doc/%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B.md",
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n\n#include <memory>\n#include \"model.h\"\n#include \"log.h\"\n#include \"utils.h\"\n#include \"param.h\"\n#include \"yolov26s_process.h\"\n\nusing namespace Infer;\n\nint main(int argc, char *argv[])\n{\n  InferParam inferParam;\n  if (!ParseParamFromCmd(argc, argv, inferParam)) {\n    return -1;\n  }\n\n  EnvInit(inferParam.aclConfigPath);\n  std::unique_ptr<Model> model = std::make_unique<Model>();\n  if (model->Load(inferParam.omModelPath) != 0) {\n    EnvDeinit();\n    return -1;\n  }\n\n  Yolov26sProcess processFunc;\n  model->SetProcessFunc(processFunc);\n\n  Yolov26sParam cfgParam;\n  cfgParam.platformType = model->GetPlatformType();\n  std::any param = cfgParam;\n  int32_t ret = model->Infer(inferParam.imglistPath, JsonFile, std::ref(param));\n  if (ret != 0) {\n    model->Unload();\n    EnvDeinit();\n    return -1;\n  }\n  if (model->Unload() != 0) {\n    EnvDeinit();\n    return -1;\n  }\n  EnvDeinit();\n  return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于[ (https://gitcode.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/common)/samples/samples_GPL/common (https://gitcode.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/common)] (https://gitcode.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/common)目录下，编译相关配置参考[ (https://gitcode.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolo26s/src/CMakeLists.txt)CMakeLists.txt (https://gitcode.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolo26s/src/CMakeLists.txt)] (https://gitcode.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolo26s/src/CMakeLists.txt)。",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for YOLO26s. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "计算量",
                "value": "23.250GFLOPs"
            },
            {
                "name": "输入",
                "value": "640x640"
            },
            {
                "name": "参数量",
                "value": "9.538M"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "20.965",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "47.630",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "33.000",
                        "unit": "内存（MB）",
                        "desc": ""
                    },
                    {
                        "value": "123.379",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "46.217",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "8.060",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "120.175",
                        "unit": "内存（MB）",
                        "desc": ""
                    },
                    {
                        "value": "282.906",
                        "unit": "单帧内存带宽 (MB)",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3516CV610",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "192.825",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "5.19",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "35.756",
                        "unit": "内存（MB）",
                        "desc": ""
                    },
                    {
                        "value": "346.308",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolo26s",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo26s",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo26s/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo26s/resolve/main/yolo26s_928_SVPNNN_%E6%AD%A4%E6%96%87%E4%BB%B6%E4%BB%85%E4%BE%9B%E5%AD%A6%E4%B9%A0%E8%AF%84%E4%BC%B0%EF%BC%8C%E5%95%86%E7%94%A8%E9%9C%80%E8%81%94%E7%B3%BB%E5%8E%9F%E4%BD%9C%E8%80%85%E8%B4%AD%E4%B9%B0%E6%8E%88%E6%9D%83.om",
        "primaryDownloadLabel": "yolo26s_928_SVPNNN_此文件仅供学习评估，商用需联系原作者购买授权.om",
        "downloads": [
            {
                "title": "yolo26s_928_SVPNNN_此文件仅供学习评估，商用需联系原作者购买授权.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo26s/resolve/main/yolo26s_928_SVPNNN_%E6%AD%A4%E6%96%87%E4%BB%B6%E4%BB%85%E4%BE%9B%E5%AD%A6%E4%B9%A0%E8%AF%84%E4%BC%B0%EF%BC%8C%E5%95%86%E7%94%A8%E9%9C%80%E8%81%94%E7%B3%BB%E5%8E%9F%E4%BD%9C%E8%80%85%E8%B4%AD%E4%B9%B0%E6%8E%88%E6%9D%83.om",
                "available": true,
                "source": "om-A16W8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "yolo26s_928_SVPNNN_此文件仅供学习评估，商用需联系原作者购买授权.om",
                "performance": [
                    {
                        "value": "20.965",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "47.630",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "33.000",
                        "unit": "内存（MB）",
                        "desc": ""
                    },
                    {
                        "value": "123.379",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolo26s_928_NNN_此文件仅供学习评估，商用需联系原作者购买授权.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo26s/resolve/main/yolo26s_928_NNN_%E6%AD%A4%E6%96%87%E4%BB%B6%E4%BB%85%E4%BE%9B%E5%AD%A6%E4%B9%A0%E8%AF%84%E4%BC%B0%EF%BC%8C%E5%95%86%E7%94%A8%E9%9C%80%E8%81%94%E7%B3%BB%E5%8E%9F%E4%BD%9C%E8%80%85%E8%B4%AD%E4%B9%B0%E6%8E%88%E6%9D%83.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "yolo26s_928_NNN_此文件仅供学习评估，商用需联系原作者购买授权.om",
                "performance": [
                    {
                        "value": "46.217",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "8.060",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "120.175",
                        "unit": "内存（MB）",
                        "desc": ""
                    },
                    {
                        "value": "282.906",
                        "unit": "单帧内存带宽 (MB)",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolo26s_610_SVPNN_此文件仅供学习评估，商用需联系原作者购买授权.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo26s/resolve/main/yolo26s_610_SVPNN_%E6%AD%A4%E6%96%87%E4%BB%B6%E4%BB%85%E4%BE%9B%E5%AD%A6%E4%B9%A0%E8%AF%84%E4%BC%B0%EF%BC%8C%E5%95%86%E7%94%A8%E9%9C%80%E8%81%94%E7%B3%BB%E5%8E%9F%E4%BD%9C%E8%80%85%E8%B4%AD%E4%B9%B0%E6%8E%88%E6%9D%83.om",
                "available": true,
                "source": "om-A16W8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3516CV610",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "yolo26s_610_SVPNN_此文件仅供学习评估，商用需联系原作者购买授权.om",
                "performance": [
                    {
                        "value": "192.825",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "5.19",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "35.756",
                        "unit": "内存（MB）",
                        "desc": ""
                    },
                    {
                        "value": "346.308",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "CANN工具",
                "href": "https://hf-mirror.com/shadow-cann/svp-nnn-pc/resolve/main/SVP_NNN_PC_V1.0.6.5.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.5.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.3/docs/zh-CN/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.3/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitcode.com/HiSpark/Hi3516CV610/tree/tag_V2.0.0_Beta",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "ku59qr0kts00",
        "name": "XFeat",
        "description": "XFeat是用于特征点检测与匹配的轻量级局部特征模型，可输出局部描述子、关键点分类图和可靠性热力图，支持基于HPatches数据集进行单应性估计评估。",
        "descriptionZh": "XFeat是用于特征点检测与匹配的轻量级局部特征模型，可输出局部描述子、关键点分类图和可靠性热力图，支持基于HPatches数据集进行单应性估计评估。",
        "descriptionEn": "XFeat is a computer vision model for feature point detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: Linux. Compute targets: Hi3516CV610. The mirror currently exposes 3 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-09-14 11:11:18",
        "updatedAt": "2026-09-15 15:27:11",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "特征点检测"
        ],
        "image": "assets/images/1767208963342338_cover.jpg",
        "coverImageUrl": "assets/images/1767208963342338_cover.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "Linux"
        ],
        "computingPower": [
            "Hi3516CV610"
        ],
        "repositoryUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/point/Xfeat/README.md",
        "licenseUrl": "https://github.com/verlab/accelerated_features/blob/main/LICENSE",
        "quickStartUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/point/Xfeat",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "XFeat 可以通过以下代码完成快速推理，该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n#include <memory>\n#include \"log.h\"\n#include \"model.h\"\n#include \"utils.h\"\n#include \"xfeat_process.h\"\n\nusing namespace Infer;\n\nint main(int argc, char *argv[])\n{\n    InferParam inferParam;\n    if (!ParseParamFromCmd(argc, argv, inferParam)) {\n        LOG(ERROR) << \"fail to parse cmd\";\n        return -1;\n    }\n    XFeatParam cfgParam;\n    if (cfgParam.InitParam(\"../data/cfg.txt\") != 0) {\n        LOG(ERROR) << \"fail to parse cfg param\";\n        return -1;\n    }\n    if (EnvInit(inferParam.aclConfigPath) != 0) {\n        LOG(ERROR) << \"fail to init env\";\n        return -1;\n    }\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(inferParam.omModelPath) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        EnvDeinit();\n        return -1;\n    }\n    XFeatProcess processFunc;\n    model->SetProcessFunc(processFunc);\n    std::any param = cfgParam;\n    auto ret = model->Infer(inferParam.imglistPath, JsonFile, std::ref(param));\n    if (ret.empty()) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        EnvDeinit();\n        return -1;\n    }\n    ret.clear();\n    ret.shrink_to_fit();\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        EnvDeinit();\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitcode.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitcode.com/HiSpark/modelzoo/blob/master/samples/built-in/point/Xfeat/src/CMakeLists.txt)。",
                "summary": "XFeat 可以通过以下代码完成快速推理，该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme",
                "summaryEn": "C++ quick-start notes for XFeat. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "640 x 480"
            },
            {
                "name": "参数量",
                "value": "0.66M"
            },
            {
                "name": "计算量",
                "value": "2.66 GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3516CV610",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "87.88",
                        "unit": "耗时（ms）",
                        "desc": "单帧推理耗时"
                    },
                    {
                        "value": "11.38",
                        "unit": "性能（fps）",
                        "desc": "帧率"
                    },
                    {
                        "value": "32.92",
                        "unit": "单帧内存带宽（MB）",
                        "desc": "DDR单帧带宽"
                    },
                    {
                        "value": "11.22",
                        "unit": "内存（MB）",
                        "desc": "峰值内存"
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "xfeat_sim.onnx",
                "size": "2.6 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-xfeat/resolve/main/xfeat_sim.onnx",
                "available": true,
                "localFile": "xfeat_sim.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-xfeat",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-xfeat",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-xfeat/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-xfeat/resolve/main/xfeat.om",
        "primaryDownloadLabel": "xfeat.om",
        "downloads": [
            {
                "title": "xfeat.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-xfeat/resolve/main/xfeat.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3516CV610",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "xfeat.om",
                "performance": [
                    {
                        "value": "87.88",
                        "unit": "耗时（ms）",
                        "desc": "单帧推理耗时"
                    },
                    {
                        "value": "11.38",
                        "unit": "性能（fps）",
                        "desc": "帧率"
                    },
                    {
                        "value": "32.92",
                        "unit": "单帧内存带宽（MB）",
                        "desc": "DDR单帧带宽"
                    },
                    {
                        "value": "11.22",
                        "unit": "内存（MB）",
                        "desc": "峰值内存"
                    }
                ]
            },
            {
                "title": "xfeat_sim.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-xfeat/resolve/main/xfeat_sim.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "xfeat_sim.onnx"
            },
            {
                "title": "SDK",
                "href": "https://gitcode.com/HiSpark/Hi3516CV610/tree/tag_V2.0.0_Beta",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "ku57c46cj400",
        "name": "UFLDv2",
        "description": "UFLDv2（Ultra-Fast-Lane-Detection-v2）是一种基于混合锚点驱动有序分类方法的车道线检测模型。该模型采用 ResNet18 作为骨干网络，配合 ParsingNet 解析网络，在保持超高推理速度的同时实现了良好的车道线检测精度。",
        "descriptionZh": "UFLDv2（Ultra-Fast-Lane-Detection-v2）是一种基于混合锚点驱动有序分类方法的车道线检测模型。该模型采用 ResNet18 作为骨干网络，配合 ParsingNet 解析网络，在保持超高推理速度的同时实现了良好的车道线检测精度。",
        "descriptionEn": "UFLDv2 is a computer vision model for 车道线检测. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: Linux. Compute targets: Hi3516CV610. The mirror currently exposes 3 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-09-14 11:00:33",
        "updatedAt": "2026-09-15 15:27:10",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "车道线检测"
        ],
        "image": "assets/images/1767233107918850_cover.jpg",
        "coverImageUrl": "assets/images/1767233107918850_cover.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "Linux"
        ],
        "computingPower": [
            "Hi3516CV610"
        ],
        "repositoryUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/detection/ufldv2/README.md",
        "licenseUrl": "https://github.com/cfzd/Ultra-Fast-Lane-Detection-v2/blob/master/LICENSE",
        "quickStartUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/detection/ufldv2",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "UFLDv2 可以通过以下代码完成快速推理，该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n#include <memory>\n#include \"log.h\"\n#include \"model.h\"\n#include \"utils.h\"\n#include \"ufldv2_process.h\"\n\nusing namespace Infer;\n\nint main(int argc, char *argv[])\n{\n    InferParam inferParam;\n    if (!ParseParamFromCmd(argc, argv, inferParam)) {\n        LOG(ERROR) << \"fail to parse cmd\";\n        return -1;\n    }\n    Ufldv2Param cfgParam;\n    if (cfgParam.InitParam(\"../data/cfg.txt\") != 0) {\n        LOG(ERROR) << \"fail to parse cfg param\";\n        return -1;\n    }\n    if (EnvInit(inferParam.aclConfigPath) != 0) {\n        LOG(ERROR) << \"fail to init env\";\n        return -1;\n    }\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(inferParam.omModelPath) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        EnvDeinit();\n        return -1;\n    }\n    Ufldv2Process processFunc;\n    model->SetProcessFunc(processFunc);\n    std::any param = cfgParam;\n    auto ret = model->Infer(inferParam.imglistPath, JsonFile, std::ref(param));\n    if (ret.empty()) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        EnvDeinit();\n        return -1;\n    }\n    ret.clear();\n    ret.shrink_to_fit();\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        EnvDeinit();\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitcode.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitcode.com/HiSpark/modelzoo/blob/master/samples/built-in/detection/ufldv2/src/CMakeLists.txt)。",
                "summary": "UFLDv2 可以通过以下代码完成快速推理，该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme",
                "summaryEn": "C++ quick-start notes for UFLDv2. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "800 x 320"
            },
            {
                "name": "参数量",
                "value": "96.365M"
            },
            {
                "name": "计算量",
                "value": "18.753 GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3516CV610",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "98.04",
                        "unit": "耗时（ms）",
                        "desc": "单帧推理耗时"
                    },
                    {
                        "value": "10.20",
                        "unit": "性能（fps）",
                        "desc": "帧率"
                    },
                    {
                        "value": "217.149",
                        "unit": "单帧内存带宽（MB）",
                        "desc": "DDR单帧带宽"
                    },
                    {
                        "value": "102.508",
                        "unit": "内存（MB）",
                        "desc": "峰值内存"
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "ufldv2.onnx",
                "size": "368 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-ufldv2/resolve/main/ufldv2.onnx",
                "available": true,
                "localFile": "ufldv2.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-ufldv2",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-ufldv2",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-ufldv2/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-ufldv2/resolve/main/ufldv2.om",
        "primaryDownloadLabel": "ufldv2.om",
        "downloads": [
            {
                "title": "ufldv2.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-ufldv2/resolve/main/ufldv2.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3516CV610",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "ufldv2.om",
                "performance": [
                    {
                        "value": "98.04",
                        "unit": "耗时（ms）",
                        "desc": "单帧推理耗时"
                    },
                    {
                        "value": "10.20",
                        "unit": "性能（fps）",
                        "desc": "帧率"
                    },
                    {
                        "value": "217.149",
                        "unit": "单帧内存带宽（MB）",
                        "desc": "DDR单帧带宽"
                    },
                    {
                        "value": "102.508",
                        "unit": "内存（MB）",
                        "desc": "峰值内存"
                    }
                ]
            },
            {
                "title": "ufldv2.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-ufldv2/resolve/main/ufldv2.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "ufldv2.onnx"
            },
            {
                "title": "SDK",
                "href": "https://gitcode.com/HiSpark/Hi3516CV610/tree/tag_V2.0.0_Beta",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "ku4ntpbgj400",
        "name": "FSMN-KWS",
        "description": "小云唤醒词检测模型基于CharCTC（Character-level Connectionist Temporal Classification）架构，用于检测语音中的特定唤醒词\"小云小云\"。模型提取音频的Fbank特征，通过LFR（Low Frame Rate）降采样和CMVN归一化后进行CTC解码，输出关键词检测结果。",
        "descriptionZh": "小云唤醒词检测模型基于CharCTC（Character-level Connectionist Temporal Classification）架构，用于检测语音中的特定唤醒词\"小云小云\"。模型提取音频的Fbank特征，通过LFR（Low Frame Rate）降采样和CMVN归一化后进行CTC解码，输出关键词检测结果。",
        "descriptionEn": "FSMN-KWS is a video model for 关键字检测. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: Linux. Compute targets: Hi3516CV610. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-09-14 09:53:03",
        "updatedAt": "2026-09-15 15:27:10",
        "badge": null,
        "betaVersionDesc": "",
        "category": "视频",
        "tags": [
            "关键字检测"
        ],
        "image": "assets/images/1763392620658690___.JPG",
        "coverImageUrl": "assets/images/1763392620658690___.JPG",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "Linux"
        ],
        "computingPower": [
            "Hi3516CV610"
        ],
        "repositoryUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/audio/fsmn_kws",
        "licenseUrl": "https://www.modelscope.cn/iic/speech_charctc_kws_phone-xiaoyun.git",
        "quickStartUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/audio/fsmn_kws",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "#include <memory>\n#include \"model.h\"\n#include \"log.h\"\n#include \"utils.h\"\n#include \"xiaoyun_preprocess.h\"\n#include \"xiaoyun_postprocess.h\"\n\nusing namespace Infer;\n\nint main(int argc, char *argv[])\n{ \n  InferParam inferParam;\n  if (!ParseParamFromCmd(argc, argv, inferParam)) {\n    LOG(ERROR) << \"fail to parse cmd\";\n    return -1;\n  }\n  EnvInit(inferParam.aclConfigPath);\n  std::unique_ptr<Model> model = std::make_unique<Model>();\n  if (model->Load(inferParam.omModelPath, Infer::Custom) != 0) {\n    LOG(ERROR) << \"fail to load model\";\n    EnvDeinit();\n    return -1;\n  }\n  model->SetPreProcessFunc(Infer::XiaoYunPreprocess ::XiaoYunPreprocess);\n  model->SetPostProcessFunc(Infer::XiaoYunPostprocess::XiaoYunPostprocess);\n  auto ret = model->Infer(inferParam.imglistPath);\n  if (ret.size() == 0) {\n    LOG(ERROR) << \"fail to infer model\";\n    model->Unload();\n    EnvDeinit();\n    return -1;\n  }\n  ret.clear();\n  ret.shrink_to_fit();\n  if (model->Unload() != 0) {\n    LOG(ERROR) << \"fail to unload model\";\n    EnvDeinit();\n    return -1;\n  }\n  EnvDeinit();\n  return 0;\n}",
                "summary": "#include <memory>",
                "summaryEn": "C++ quick-start notes for FSMN-KWS. Covers runtime initialization, model loading, inference execution, configuration handling, and build instructions."
            }
        ],
        "detailParams": [
            {
                "name": "计算量",
                "value": "0.229GFLOPs"
            },
            {
                "name": "输入",
                "value": "151x400"
            },
            {
                "name": "参数量",
                "value": "0.758M"
            }
        ],
        "performance": [
            {
                "engine": "Hi3516CV610",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "5.87",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "170.27",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "10.036",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "2.98",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "speech_charctc_kws_phone-xiaoyun_onnxsim_364.onnx",
                "size": "2.9 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fsmn-kws/resolve/main/speech_charctc_kws_phone-xiaoyun_onnxsim_364.onnx",
                "available": true,
                "localFile": "speech_charctc_kws_phone-xiaoyun_onnxsim_364.onnx"
            },
            {
                "name": "speech_charctc_kws_phone-xiaoyun_onnxsim_151.onnx",
                "size": "2.9 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fsmn-kws/resolve/main/speech_charctc_kws_phone-xiaoyun_onnxsim_151.onnx",
                "available": true,
                "localFile": "speech_charctc_kws_phone-xiaoyun_onnxsim_151.onnx"
            },
            {
                "name": "speech_charctc_kws_phone-xiaoyun_364.onnx",
                "size": "2.9 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fsmn-kws/resolve/main/speech_charctc_kws_phone-xiaoyun_364.onnx",
                "available": true,
                "localFile": "speech_charctc_kws_phone-xiaoyun_364.onnx"
            },
            {
                "name": "speech_charctc_kws_phone-xiaoyun_151.onnx",
                "size": "2.9 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fsmn-kws/resolve/main/speech_charctc_kws_phone-xiaoyun_151.onnx",
                "available": true,
                "localFile": "speech_charctc_kws_phone-xiaoyun_151.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-fsmn-kws",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fsmn-kws",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fsmn-kws/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fsmn-kws/resolve/main/kws-610.om",
        "primaryDownloadLabel": "kws-610.om",
        "downloads": [
            {
                "title": "kws-610.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fsmn-kws/resolve/main/kws-610.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3516CV610",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "kws-610.om",
                "performance": [
                    {
                        "value": "5.87",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "170.27",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "10.036",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "2.98",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "kws-610-a.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fsmn-kws/resolve/main/kws-610-a.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3516CV610",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "kws-610-a.om",
                "performance": [
                    {
                        "value": "5.87",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "170.27",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "10.036",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "2.98",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "speech_charctc_kws_phone-xiaoyun_onnxsim_364.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fsmn-kws/resolve/main/speech_charctc_kws_phone-xiaoyun_onnxsim_364.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "speech_charctc_kws_phone-xiaoyun_onnxsim_364.onnx"
            },
            {
                "title": "speech_charctc_kws_phone-xiaoyun_onnxsim_151.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fsmn-kws/resolve/main/speech_charctc_kws_phone-xiaoyun_onnxsim_151.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "speech_charctc_kws_phone-xiaoyun_onnxsim_151.onnx"
            },
            {
                "title": "speech_charctc_kws_phone-xiaoyun_364.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fsmn-kws/resolve/main/speech_charctc_kws_phone-xiaoyun_364.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "speech_charctc_kws_phone-xiaoyun_364.onnx"
            },
            {
                "title": "speech_charctc_kws_phone-xiaoyun_151.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fsmn-kws/resolve/main/speech_charctc_kws_phone-xiaoyun_151.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "speech_charctc_kws_phone-xiaoyun_151.onnx"
            },
            {
                "title": "SDK",
                "href": "https://gitcode.com/HiSpark/Hi3516CV610/tree/tag_V2.0.0_Beta",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "ku4m5qfcts00",
        "name": "SE-ResNet50",
        "description": "SE-ResNet50是一种基于ResNet50架构的改进卷积神经网络，通过引入SE（Squeeze-and-Excitation）注意力模块，自适应校准通道特征响应，显著提升模型表达能力。",
        "descriptionZh": "SE-ResNet50是一种基于ResNet50架构的改进卷积神经网络，通过引入SE（Squeeze-and-Excitation）注意力模块，自适应校准通道特征响应，显著提升模型表达能力。",
        "descriptionEn": "SE-ResNet50 is a computer vision model for classification. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-09-14 09:45:25",
        "updatedAt": "2026-09-15 15:27:11",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "assets/images/1712179080462337_SEResNet50.png",
        "coverImageUrl": "assets/images/1712179080462337_SEResNet50.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/SEResNet50",
        "licenseUrl": "https://github.com/morning4346/Se_resnet50/blob/master/LICENSE",
        "quickStartUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/SEResNet50",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "SEResnet50模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // SEResnet50模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::SEResnet50) != 0) {\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitcode.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitcode.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/SEResnet50/src/CMakeLists.txt)",
                "summary": "SEResnet50模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for SE-ResNet50. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "224x224"
            },
            {
                "name": "参数量",
                "value": "28.045M"
            },
            {
                "name": "计算量",
                "value": "8.263GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "73.63",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "13.58",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "165.344",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "35.777",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "15.602",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "63.83",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "216.793",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "166.801",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "seresnet50.onnx",
                "size": "107 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-se-resnet50/resolve/main/seresnet50.onnx",
                "available": true,
                "localFile": "seresnet50.onnx"
            },
            {
                "name": "seresnet50.zip",
                "size": "99.9 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-se-resnet50/resolve/main/seresnet50.zip",
                "available": true,
                "localFile": "seresnet50.zip"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-se-resnet50",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-se-resnet50",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-se-resnet50/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-se-resnet50/resolve/main/seresnet50.om",
        "primaryDownloadLabel": "seresnet50.om",
        "downloads": [
            {
                "title": "seresnet50.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-se-resnet50/resolve/main/seresnet50.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "seresnet50.om",
                "performance": [
                    {
                        "value": "73.63",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "13.58",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "165.344",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "35.777",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "seresnet50_FP16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-se-resnet50/resolve/main/seresnet50_FP16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "seresnet50_FP16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "15.602",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "63.83",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "216.793",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "166.801",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "seresnet50.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-se-resnet50/resolve/main/seresnet50.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "seresnet50.onnx"
            },
            {
                "title": "seresnet50.zip",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-se-resnet50/resolve/main/seresnet50.zip",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "seresnet50.zip"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "ktgi9vl8j400",
        "name": "Depth-Anything-v2",
        "description": "Depth Anything V2在细节和鲁棒性方面显著优于 V1。与基于 SD 的模型相比，它具有更快的推理速度、更少的参数和更高的深度精度。本示例使用的是Depth-Anything-V2-Small。",
        "descriptionZh": "Depth Anything V2在细节和鲁棒性方面显著优于 V1。与基于 SD 的模型相比，它具有更快的推理速度、更少的参数和更高的深度精度。本示例使用的是Depth-Anything-V2-Small。",
        "descriptionEn": "Depth-Anything-v2 is a computer vision model for monocular depth. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 8 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-09-12 10:52:18",
        "updatedAt": "2026-09-15 15:27:10",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "单目深度"
        ],
        "image": "assets/images/1700942867267585_depth.png",
        "coverImageUrl": "assets/images/1700942867267585_depth.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/depth/Depth-Anything-v2",
        "licenseUrl": "https://github.com/DepthAnything/Depth-Anything-V2/blob/main/LICENSE",
        "quickStartUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/depth/Depth-Anything-v2",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "Depth-Anything-v2模型可以通过以下代码完成快速推理\n\nusing namespace Infer;\n\nint main()\n{\n    std::string modelPath = \"/path/to/imgModel.om\"; // 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::string aclConfigPath = \"/path/to/acl.cfg\"; // 输入acl的配置路径\n    int ret;\n    ret = Infer::DevInit(aclConfigPath);\n    std::shared_ptr<Infer::MdlBase> model = Infer::MdlCreate();\n    ret = model->LoadModel(modelPath);\n    std::vector<std::string> imglists;\n    ret = ReadImglistFile(imagePath, imglists);\n    std::vector<Infer::TensorBuf> inBufs, outBufs;\n    std::vector<Infer::TensorDesc> inDescs, outDescs;\n    Infer::TensorDesc desc;\n    size_t inputNum = model->GetInTensorNum();\n    size_t  outputNum = model->GetOutTensorNum();\n    for (size_t i = 0; i < inputNum; i++) {\n        model->GetInTensorDescByIdx(i, desc);\n        inDescs.push_back(desc);\n        inBufs.emplace_back(desc.defaultSize, desc.defaultStride);\n    }\n    for (size_t i = 0; i < outputNum; i++) {\n        model->GetOutTensorDescByIdx(i, desc);\n        outDescs.push_back(desc);\n        outBufs.emplace_back(desc.defaultSize, desc.defaultStride);\n    }\n    model->GetInTensorDescByIdx(0, desc);\n    for (size_t i = 0; i < imglists.size(); ++i) {\n        ret = ReadImgFileToBuf(imglists[i], desc, inBufs[0]);\n        ret = model->Execute(inBufs, outBufs);\n        (void)PostProcess(outBufs, outDescs, imglists[i]);\n    }\n    model->UnLoadModel();\n    Infer::DevDeInit();\n    return 0;\n}\n备注：上述C++代码仅展示了主要流程，详细实现请参考Depth-Anything-v2 (https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/depth/Depth-Anything-v2)。",
                "summary": "Depth-Anything-v2模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for Depth-Anything-v2. Covers runtime initialization, inference execution, and configuration handling."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "518x518"
            },
            {
                "name": "参数量",
                "value": "24.184M"
            },
            {
                "name": "计算量",
                "value": "127.785GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "266.06",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "3.76",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "2243.373",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "87.072",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "275.482",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "3.63",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "1604.515",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "254.773",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "depth_anything_v2_vits.pth",
                "size": "94.6 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/depth_anything_v2_vits.pth",
                "available": true,
                "localFile": "depth_anything_v2_vits.pth"
            },
            {
                "name": "depth_anything_v2_vits_svp_nnn.onnx",
                "size": "94.4 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/depth_anything_v2_vits_svp_nnn.onnx",
                "available": true,
                "localFile": "depth_anything_v2_vits_svp_nnn.onnx"
            },
            {
                "name": "depth_anything_v2_vits_nnn.onnx",
                "size": "148 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/depth_anything_v2_vits_nnn.onnx",
                "available": true,
                "localFile": "depth_anything_v2_vits_nnn.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-depth-anything-v2",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/depth_anything.om",
        "primaryDownloadLabel": "depth_anything.om",
        "downloads": [
            {
                "title": "depth_anything.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/depth_anything.om",
                "available": true,
                "source": "om-A16W8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "depth_anything.om",
                "performance": [
                    {
                        "value": "266.06",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "3.76",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "2243.373",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "87.072",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "depthanything.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/depthanything.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "depthanything.om",
                "performance": [
                    {
                        "value": "275.482",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "3.63",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "1604.515",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "254.773",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "depth_anything_v2_vits.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/depth_anything_v2_vits.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "depth_anything_v2_vits.pth"
            },
            {
                "title": "depth_anything_v2_vits_svp_nnn.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/depth_anything_v2_vits_svp_nnn.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "depth_anything_v2_vits_svp_nnn.onnx"
            },
            {
                "title": "depth_anything_v2_vits_nnn.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/depth_anything_v2_vits_nnn.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "depth_anything_v2_vits_nnn.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "ko3ugg54j400",
        "name": "Swin-Transformer",
        "description": "Swin-Transformer是针对于图片处理设计的基于Transformer架构的神经网络。该网络针对原始Transformer迁移到图片端后计算量过大，复用困难的问题，提出了新的swin-block以代替原有的attention架构。模型以窗口的attention方式极大地减少了图像不同区域间的互相响应，同时也避免了部分冗余信息的产生。最终，模型在减少了大量计算量的同时，在不同的视觉传统任务上也有了效果的提升。",
        "descriptionZh": "Swin-Transformer是针对于图片处理设计的基于Transformer架构的神经网络。该网络针对原始Transformer迁移到图片端后计算量过大，复用困难的问题，提出了新的swin-block以代替原有的attention架构。模型以窗口的attention方式极大地减少了图像不同区域间的互相响应，同时也避免了部分冗余信息的产生。最终，模型在减少了大量计算量的同时，在不同的视觉传统任务上也有了效果的提升。",
        "descriptionEn": "Swin-Transformer is a computer vision model for classification. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 8 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-08-26 16:38:28",
        "updatedAt": "2026-09-01 16:13:06",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "assets/images/1701485580845059_swint.png",
        "coverImageUrl": "assets/images/1701485580845059_swint.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/Swin-Transformer",
        "licenseUrl": "https://github.com/microsoft/Swin-Transformer/blob/main/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/Swin-Transformer",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "Swin-Transformer可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // Swin-Transformer 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::SwinT) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/Swin-Transformer/src/CMakeLists.txt)",
                "summary": "Swin-Transformer可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme",
                "summaryEn": "C++ quick-start notes for Swin-Transformer. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "224x224"
            },
            {
                "name": "参数量",
                "value": "28.798M"
            },
            {
                "name": "计算量",
                "value": "9.567GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "25.675",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "38.949",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "295.711",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "38.176",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "101.97",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "9.81",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "494.766",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "215.668",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "swin.onnx",
                "size": "110 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin.onnx",
                "available": true,
                "localFile": "swin.onnx"
            },
            {
                "name": "swin_tiny_patch4_window7_224.pth",
                "size": "109 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin_tiny_patch4_window7_224.pth",
                "available": true,
                "localFile": "swin_tiny_patch4_window7_224.pth"
            },
            {
                "name": "swin_sim.onnx",
                "size": "110 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin_sim.onnx",
                "available": true,
                "localFile": "swin_sim.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-swin-transformer",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin.om",
        "primaryDownloadLabel": "swin.om",
        "downloads": [
            {
                "title": "swin.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "swin.om",
                "performance": [
                    {
                        "value": "25.675",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "38.949",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "295.711",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "38.176",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "swin_dlite.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin_dlite.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "swin_dlite.om",
                "performance": [
                    {
                        "value": "101.97",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "9.81",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "494.766",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "215.668",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "swin.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "swin.onnx"
            },
            {
                "title": "swin_tiny_patch4_window7_224.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin_tiny_patch4_window7_224.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "swin_tiny_patch4_window7_224.pth"
            },
            {
                "title": "swin_sim.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin_sim.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "swin_sim.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "ko3p9r40j400",
        "name": "EfficientNetV2",
        "description": "EfficientNetV2是一系列图像分类模型，与现有技术相比，其实现了更好的参数效率和更快的训练速度。基于EfficientNetV1，Efficient NetV2模型使用神经架构搜索（NAS）来联合优化模型大小和训练速度，并以更快的训练和推理速度进行扩展。",
        "descriptionZh": "EfficientNetV2是一系列图像分类模型，与现有技术相比，其实现了更好的参数效率和更快的训练速度。基于EfficientNetV1，Efficient NetV2模型使用神经架构搜索（NAS）来联合优化模型大小和训练速度，并以更快的训练和推理速度进行扩展。",
        "descriptionEn": "EfficientNetV2 is a computer vision model for classification. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-08-26 16:15:43",
        "updatedAt": "2026-09-01 16:13:06",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "assets/images/1700943102148611_eff.png",
        "coverImageUrl": "assets/images/1700943102148611_eff.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/EfficientNetV2",
        "licenseUrl": "https://github.com/huggingface/pytorch-image-models/blob/main/LICENSE",
        "quickStartUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/EfficientNetV2",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "EfficientNetV2模型可以通过以下代码完成快速推理\n#include <memory>\n#include \"model.h\"\n#include \"log.h\"\n#include \"utils.h\"\n#include \"efficientnet_process.h\"\n\nusing namespace Infer;\n\nint main(int argc, char *argv[])\n{\n    InferParam inferParam;\n    if (!ParseParamFromCmd(argc, argv, inferParam)) {\n        LOG(ERROR) << \"fail to parse cmd\";\n        return -1;\n    }\n\tEfficientNetParam cfgParam;\n    if (cfgParam.InitParam(\"../data/cfg.txt\") != 0) {\n        LOG(ERROR) << \"fail to parse cfg param\";\n        return -1;\n    }\n    EnvInit(inferParam.aclConfigPath);\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(inferParam.omModelPath) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    cfgParam.platformType = model->GetPlatformType();\n    std::any param = cfgParam;\n    EfficientNetProcess processFunc;\n    model->SetProcessFunc(processFunc);\n    auto ret = model->Infer(inferParam.imglistPath, JsonFile, std::ref(param));\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        EnvDeinit();\n        return -1;\n    }\n    ret.clear();\n    ret.shrink_to_fit();\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        EnvDeinit();\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitcode.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitcode.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/EfficientNetV2/src/CMakeLists.txt)。",
                "summary": "EfficientNetV2模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for EfficientNetV2. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "288x288"
            },
            {
                "name": "参数量",
                "value": "25.530M"
            },
            {
                "name": "计算量",
                "value": "8.235GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "27.35",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "36.57",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "55.91",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "20.441",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "36.512",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "27.388",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "150.156",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "131.914",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "efficientnetv2.onnx",
                "size": "51.9 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-efficientnetv2/resolve/main/efficientnetv2.onnx",
                "available": true,
                "localFile": "efficientnetv2.onnx"
            },
            {
                "name": "efficientnetv2_t_agc-3620981a.pth",
                "size": "52.6 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-efficientnetv2/resolve/main/efficientnetv2_t_agc-3620981a.pth",
                "available": true,
                "localFile": "efficientnetv2_t_agc-3620981a.pth"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-efficientnetv2",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-efficientnetv2",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-efficientnetv2/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-efficientnetv2/resolve/main/efficientnetv2.om",
        "primaryDownloadLabel": "efficientnetv2.om",
        "downloads": [
            {
                "title": "efficientnetv2.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-efficientnetv2/resolve/main/efficientnetv2.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "efficientnetv2.om",
                "performance": [
                    {
                        "value": "27.35",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "36.57",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "55.91",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "20.441",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "efficientnetv2_FP16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-efficientnetv2/resolve/main/efficientnetv2_FP16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "efficientnetv2_FP16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "36.512",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "27.388",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "150.156",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "131.914",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "efficientnetv2.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-efficientnetv2/resolve/main/efficientnetv2.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "efficientnetv2.onnx"
            },
            {
                "title": "efficientnetv2_t_agc-3620981a.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-efficientnetv2/resolve/main/efficientnetv2_t_agc-3620981a.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "efficientnetv2_t_agc-3620981a.pth"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "ko3omi98j400",
        "name": "TinySam",
        "description": "TinySAM 通过全阶段知识蒸馏、在线硬提示采样、量化等系列优化策略，构建轻量级 “万物分割” 模型，解决了原始 SAM 模型计算量大、部署困难的痛点，助力高效分割任务在资源受限场景下的应用。",
        "descriptionZh": "TinySAM 通过全阶段知识蒸馏、在线硬提示采样、量化等系列优化策略，构建轻量级 “万物分割” 模型，解决了原始 SAM 模型计算量大、部署困难的痛点，助力高效分割任务在资源受限场景下的应用。",
        "descriptionEn": "TinySam is a computer vision model for segmentation. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 10 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-08-26 16:13:05",
        "updatedAt": "2026-09-01 16:13:06",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分割"
        ],
        "image": "assets/images/1719774851694593_realquant_201909262051154_0.jpg",
        "coverImageUrl": "assets/images/1719774851694593_realquant_201909262051154_0.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/segmentation/TinySam",
        "licenseUrl": "https://github.com/xinghaochen/TinySAM/blob/main/LICENSE",
        "quickStartUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/built-in/segmentation/TinySam/",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "TinySam模型可以通过以下代码完成快速推理\n#include \"sam_predictor.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    SAMBoxPredictor predictor;\n    predictor.loadModel(modelPaths);\n    predictor.setImage(image); // 编码图像数据\n    predictor.predict(boxes);  // 设置检测框进行分割模型掩码解码\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与文件位于/samples/common (https://gitcode.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitcode.com/HiSpark/modelzoo/blob/master/samples/built-in/segmentation/TinySam/src/CMakeLists.txt)。",
                "summary": "TinySam模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for TinySam. Covers runtime initialization, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "448*448"
            },
            {
                "name": "参数量",
                "value": "5.739M"
            },
            {
                "name": "计算量",
                "value": "15.423GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "250.58",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "3.99",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "330.25",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "32.442",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "398.406",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "2.51",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "1178.383",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "234.285",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "tinysam.pth",
                "size": "38.8 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/tinysam.pth",
                "available": true,
                "localFile": "tinysam.pth"
            },
            {
                "name": "model_onnx_svp_nnn.zip",
                "size": "8.9 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/model_onnx_svp_nnn.zip",
                "available": true,
                "localFile": "model_onnx_svp_nnn.zip"
            },
            {
                "name": "model_nnn_onnx.zip",
                "size": "38.0 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/model_nnn_onnx.zip",
                "available": true,
                "localFile": "model_nnn_onnx.zip"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-tinysam",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/tinysam%E6%94%B9%E5%90%8E%E7%BC%80%E4%B8%BAzip%E8%A7%A3%E5%8E%8B%E5%90%8E%E4%BD%BF%E7%94%A8.om",
        "primaryDownloadLabel": "tinysam改后缀为zip解压后使用.om",
        "downloads": [
            {
                "title": "tinysam改后缀为zip解压后使用.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/tinysam%E6%94%B9%E5%90%8E%E7%BC%80%E4%B8%BAzip%E8%A7%A3%E5%8E%8B%E5%90%8E%E4%BD%BF%E7%94%A8.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "tinysam改后缀为zip解压后使用.om",
                "performance": [
                    {
                        "value": "250.58",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "3.99",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "330.25",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "32.442",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "prompt_encoder_deploy_model.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/prompt_encoder_deploy_model.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "prompt_encoder_deploy_model.om",
                "performance": [
                    {
                        "value": "398.406",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "2.51",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "1178.383",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "234.285",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "image_encoder_deploy_model.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/image_encoder_deploy_model.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "image_encoder_deploy_model.om",
                "performance": [
                    {
                        "value": "398.406",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "2.51",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "1178.383",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "234.285",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "mask_decoder_deploy_model.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/mask_decoder_deploy_model.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "mask_decoder_deploy_model.om",
                "performance": [
                    {
                        "value": "398.406",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "2.51",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "1178.383",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "234.285",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "tinysam.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/tinysam.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "tinysam.pth"
            },
            {
                "title": "model_onnx_svp_nnn.zip",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/model_onnx_svp_nnn.zip",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "model_onnx_svp_nnn.zip"
            },
            {
                "title": "model_nnn_onnx.zip",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/model_nnn_onnx.zip",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "model_nnn_onnx.zip"
            },
            {
                "title": "CANN配置",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具库",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "knq1gnnkts00",
        "name": "YOLOv10s",
        "description": "YOLOv10 引入了一种新的实时目标检测方法，解决了以前YOLO 版本在后处理和模型架构方面的不足。通过消除非最大抑制NMS和优化各种模型组件，YOLOv10 显著降低了计算开销。本示例基于YOLOv10s。",
        "descriptionZh": "YOLOv10 引入了一种新的实时目标检测方法，解决了以前YOLO 版本在后处理和模型架构方面的不足。通过消除非最大抑制NMS和优化各种模型组件，YOLOv10 显著降低了计算开销。本示例基于YOLOv10s。",
        "descriptionEn": "YOLOv10s is a computer vision model for object detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-08-25 17:33:30",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "assets/images/1764112377970690_1719767893344257______20251226152658.png",
        "coverImageUrl": "assets/images/1764112377970690_1719767893344257______20251226152658.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov10s",
        "licenseUrl": "https://github.com/THU-MIG/yolov10/blob/v1.1/LICENSE",
        "quickStartUrl": "https://gitcode.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov10s",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "YOLOv10s模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n  EnvInit();\n  std::string omModelPath = \"/path/to/model.om\"; // YOLOv10s模型文件路径 \n  std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n  std::unique_ptr<Model> model = std::make_unique<Model>();\n  if (model->Load(omModelPath, ModelType::Yolov10s) != 0) {\n    LOG(ERROR) << \"fail to load model\";\n    return -1;\n  }\n  auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n  if (ret.size() == 0) {\n    LOG(ERROR) << \"fail to infer model\";\n    model->Unload();\n    return -1;\n  }\n  if (model->Unload() != 0) {\n    LOG(ERROR) << \"fail to unload model\";\n    return -1;\n  }\n  EnvDeinit();\n  return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于[/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)]目录下，编译相关配置参考[CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov10s/src/CMakeLists.txt)]。",
                "summary": "YOLOv10s模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for YOLOv10s. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "640x640"
            },
            {
                "name": "参数量",
                "value": "7.291M"
            },
            {
                "name": "计算量",
                "value": "24.073GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "29.03",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "34.44",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "115.224",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "53.785",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "48.325",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "8.13",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "263.663",
                        "unit": "内存（MB）",
                        "desc": ""
                    },
                    {
                        "value": "112.254",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "yolov10s.onnx",
                "size": "27.8 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov10s/resolve/main/yolov10s.onnx",
                "available": true,
                "localFile": "yolov10s.onnx"
            },
            {
                "name": "yolov10s.pt",
                "size": "31.4 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov10s/resolve/main/yolov10s.pt",
                "available": true,
                "localFile": "yolov10s.pt"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolov10s",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov10s",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov10s/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov10s/resolve/main/yolov10s.om",
        "primaryDownloadLabel": "yolov10s.om",
        "downloads": [
            {
                "title": "yolov10s.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov10s/resolve/main/yolov10s.om",
                "available": true,
                "source": "om-A16W8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "yolov10s.om",
                "performance": [
                    {
                        "value": "29.03",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "34.44",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "115.224",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "53.785",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov10s_FP16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov10s/resolve/main/yolov10s_FP16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "yolov10s_FP16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "48.325",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "8.13",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "263.663",
                        "unit": "内存（MB）",
                        "desc": ""
                    },
                    {
                        "value": "112.254",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov10s.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov10s/resolve/main/yolov10s.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov10s.onnx"
            },
            {
                "title": "yolov10s.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov10s/resolve/main/yolov10s.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov10s.pt"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "jrc61eo19400",
        "name": "FastSpeech2",
        "description": "FastSpeech2 是一种高效的端到端语音合成模型。相比 FastSpeech，FastSpeech2 引入了多尺度时长预测器和能量 / 基频预测分支，优化了时长预测模块并新增韵律特征建模，在合成速度和语音自然度上均有大幅提升。",
        "descriptionZh": "FastSpeech2 是一种高效的端到端语音合成模型。相比 FastSpeech，FastSpeech2 引入了多尺度时长预测器和能量 / 基频预测分支，优化了时长预测模块并新增韵律特征建模，在合成速度和语音自然度上均有大幅提升。",
        "descriptionEn": "FastSpeech2 is a audio model for text-to-speech. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: Linux and OpenHarmony. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 6 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-05-29 09:26:03",
        "updatedAt": "2026-09-01 16:13:07",
        "badge": null,
        "betaVersionDesc": "",
        "category": "音频",
        "tags": [
            "文本转语音"
        ],
        "image": "assets/images/1722265270026243_fastspeech2.jpg",
        "coverImageUrl": "assets/images/1722265270026243_fastspeech2.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "Linux",
            "OpenHarmony"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitcode.com/HiSpark/modelzoo/blob/master/samples/built-in/audio/FastSpeech2/README.md",
        "licenseUrl": "https://github.com/ming024/FastSpeech2/blob/master/LICENSE",
        "quickStartUrl": "https://gitcode.com/HiSpark/modelzoo/blob/master/samples/built-in/audio/FastSpeech2",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n    std::string filePath= \"/path/to/file_list.json\"; // 输入文本文件路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::FastSpeech2) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(filePath, FileType::JsonFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitcode.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitcode.com/HiSpark/modelzoo/blob/master/samples/built-in/audio/FastSpeech2/src/CMakeLists.txt)。",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for FastSpeech2. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "1x40"
            },
            {
                "name": "参数量",
                "value": "35.266M"
            },
            {
                "name": "计算量",
                "value": "29.162GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "52.49",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "19.05",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "484.476",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "108.629",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "67.934",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "14.72",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "651.341",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "234.285",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "fastspeech_hifigan_en_nnn.onnx",
                "size": "136 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fastspeech2/resolve/main/fastspeech_hifigan_en_nnn.onnx",
                "available": true,
                "localFile": "fastspeech_hifigan_en_nnn.onnx"
            },
            {
                "name": "fastspeech_hifigan_en_svp_nnn.onnx",
                "size": "136 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fastspeech2/resolve/main/fastspeech_hifigan_en_svp_nnn.onnx",
                "available": true,
                "localFile": "fastspeech_hifigan_en_svp_nnn.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-fastspeech2",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fastspeech2",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fastspeech2/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fastspeech2/resolve/main/fastspeech_hifigan_en.om",
        "primaryDownloadLabel": "fastspeech_hifigan_en.om",
        "downloads": [
            {
                "title": "fastspeech_hifigan_en.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fastspeech2/resolve/main/fastspeech_hifigan_en.om",
                "available": true,
                "source": "om-A16W8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "fastspeech_hifigan_en.om",
                "performance": [
                    {
                        "value": "52.49",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "19.05",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "484.476",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "108.629",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "fastspeech_hifigan_en_nnn.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fastspeech2/resolve/main/fastspeech_hifigan_en_nnn.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "fastspeech_hifigan_en_nnn.om",
                "performance": [
                    {
                        "value": "67.934",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "14.72",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "651.341",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "234.285",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "fastspeech_hifigan_en_nnn.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fastspeech2/resolve/main/fastspeech_hifigan_en_nnn.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "fastspeech_hifigan_en_nnn.onnx"
            },
            {
                "title": "fastspeech_hifigan_en_svp_nnn.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fastspeech2/resolve/main/fastspeech_hifigan_en_svp_nnn.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "fastspeech_hifigan_en_svp_nnn.onnx"
            },
            {
                "title": "编译工具库",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "joqqhel5c400",
        "name": "MiniCPM-4v-0.5B",
        "description": "MiniCPM-4v-0.5B: 小参数, 大智慧——端侧多模态模型\n\n由面壁智能(OpenBMB)打造的MiniCPM-4v-0.5B, 以0.53B的精简参数量，在端侧设备上实现了卓越的图文理解与交互能力。专为边缘计算场景设计，让每一分算力都充分发挥价值。\n\n三大核心优势：\n    1. 创新架构，轻装上阵\n通过创新的稀疏感知训练和视觉压缩技术，实现 16:1 视觉特征压缩比，在保证高精度的同时，极大降低了推理算力消耗与内存占用。\n    2. 高能数据，以小博大\n依托高密度数据体系，数据准备成本下降90%。通过汇聚全球高质量语料进行精细化对齐，用优质的数据训练模型，实现越级性能表现。\n    3. 高效训练，成本锐减\n采用原创 WSD 调度策略与“模型风洞”技术，相比传统方案，搜索算力节省超99%，整体训练成本节省约60%，为端侧模型的持续迭代提供高效路径。\n\n海思平台技术支撑：\n现已适配 Hi3403V100 平台，持续生成速度达 21 tokens/s，为边缘侧设备提供流程、敏捷的智能视觉体验。",
        "descriptionZh": "MiniCPM-4v-0.5B: 小参数, 大智慧——端侧多模态模型\n\n由面壁智能(OpenBMB)打造的MiniCPM-4v-0.5B, 以0.53B的精简参数量，在端侧设备上实现了卓越的图文理解与交互能力。专为边缘计算场景设计，让每一分算力都充分发挥价值。\n\n三大核心优势：\n    1. 创新架构，轻装上阵\n通过创新的稀疏感知训练和视觉压缩技术，实现 16:1 视觉特征压缩比，在保证高精度的同时，极大降低了推理算力消耗与内存占用。\n    2. 高能数据，以小博大\n依托高密度数据体系，数据准备成本下降90%。通过汇聚全球高质量语料进行精细化对齐，用优质的数据训练模型，实现越级性能表现。\n    3. 高效训练，成本锐减\n采用原创 WSD 调度策略与“模型风洞”技术，相比传统方案，搜索算力节省超99%，整体训练成本节省约60%，为端侧模型的持续迭代提供高效路径。\n\n海思平台技术支撑：\n现已适配 Hi3403V100 平台，持续生成速度达 21 tokens/s，为边缘侧设备提供流程、敏捷的智能视觉体验。",
        "descriptionEn": "MiniCPM-4v-0. 5B is a natural language processing model for VLM. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: Linux. Compute targets: Hi3403V100 SVP_NNN. The mirror currently exposes 1 downloadable artifact, along with quick-start resources when available.",
        "date": "2026-05-21 11:51:11",
        "updatedAt": null,
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 SVP_NNN引擎上模型性能待进一步优化。",
        "category": "自然语言处理",
        "tags": [
            "VLM"
        ],
        "image": "assets/images/1735709648093187_MiniCPM.png",
        "coverImageUrl": "assets/images/1735709648093187_MiniCPM.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/vlm/MiniCPM/README.md",
        "licenseUrl": "https://hf-mirror.com/shadow-cann/minicpm-v-0.5B",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/vlm/MiniCPM/README.md",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "MiniCPM模型可以通过以下代码完成快速推理\n#include \"log.h\"\n#include \"MiniCpmInfer.h\"\n\nint main()\n{\n    EnvInit();\n    string result;\n    MiniCpmInfer model;\n    auto imagePath = \"../datasets/demo.png\"; // 图片地址\n    auto text = \"翻译\";      // 文本描述内容\n    LOG(INFO) << \"\\n Current question: \\n Text: \" << text << \"\\n Image path: \" << imagePath;\n    result = model.InferSingle(imagePath, text);\n    LOG(INFO) << \"\\nMiniCPM infer result: \\n\" << result;\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于目录 /samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)下，编译相关配置参考 CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/vlm/MiniCPM/src/CMakeLists.txt)。",
                "summary": "MiniCPM模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for MiniCPM-4v-0.5B. Covers runtime initialization, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "图片: 512x512  Embedding: 200 Tokens"
            },
            {
                "name": "参数量",
                "value": "520.333 M"
            },
            {
                "name": "计算量",
                "value": "413.886 GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "21.300",
                        "unit": "TPS（Token/s）",
                        "desc": ""
                    },
                    {
                        "value": "519.740",
                        "unit": "TTFT（ms）",
                        "desc": ""
                    },
                    {
                        "value": "544.514",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "1217.676",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [],
        "hfRepoId": "shadow-cann/minicpm-v-0.5B",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/minicpm-v-0.5B",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/minicpm-v-0.5B/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/minicpm-v-0.5B/tree/main",
        "primaryDownloadLabel": "OM 文件 2.zip",
        "downloads": [
            {
                "title": "OM 文件 2.zip",
                "href": "https://hf-mirror.com/shadow-cann/minicpm-v-0.5B/tree/main",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "jk1dfiigi000",
        "name": "Yolov8s-World",
        "description": "Yolov8s-World 是 Ultralytics 推出的一种基于 YOLO-World 架构的轻量级目标检测模型，它通过视觉-语言预训练实现了无需针对特定类别进行训练即可识别任意物体的 “开放词汇” (Open-Vocabulary) 实时检测功能。",
        "descriptionZh": "Yolov8s-World 是 Ultralytics 推出的一种基于 YOLO-World 架构的轻量级目标检测模型，它通过视觉-语言预训练实现了无需针对特定类别进行训练即可识别任意物体的 “开放词汇” (Open-Vocabulary) 实时检测功能。",
        "descriptionEn": "Yolov8s-World is a computer vision model for object detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 8 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-05-06 14:23:10",
        "updatedAt": "2026-05-12 19:06:21",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "assets/images/1737338061389827_6.png",
        "coverImageUrl": "assets/images/1737338061389827_6.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/Hispark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov8s-world",
        "licenseUrl": "https://github.com/ultralytics/ultralytics/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/Hispark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov8s-world",
        "quickStartMarkdownUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov8s-world/doc/%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B.md",
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "yolov8s-world 可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // yolov8s-world模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::Yolov8sWorld) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov8s-world/src/CMakeLists.txt)",
                "summary": "yolov8s-world 可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme",
                "summaryEn": "C++ quick-start notes for Yolov8s-World. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "计算量",
                "value": "34.636 GFLOPs"
            },
            {
                "name": "输入",
                "value": "640x640"
            },
            {
                "name": "参数量",
                "value": "12.746 M"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "103.419",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "41.71",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "139.937",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "47.867",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "48.415",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "20.64",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "442.179",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "132.621",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "yolov8s-worldv2_svp_nnn.onnx",
                "size": "12.4 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-world/resolve/main/yolov8s-worldv2_svp_nnn.onnx",
                "available": true,
                "localFile": "yolov8s-worldv2_svp_nnn.onnx"
            },
            {
                "name": "yolov8s-worldv2.pt",
                "size": "24.7 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-world/resolve/main/yolov8s-worldv2.pt",
                "available": true,
                "localFile": "yolov8s-worldv2.pt"
            },
            {
                "name": "yolov8s-worldv20_nnn.onnx",
                "size": "49.0 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-world/resolve/main/yolov8s-worldv20_nnn.onnx",
                "available": true,
                "localFile": "yolov8s-worldv20_nnn.onnx"
            },
            {
                "name": "text_feature.zip",
                "size": "143 KB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-world/resolve/main/text_feature.zip",
                "available": true,
                "localFile": "text_feature.zip"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolov8s-world",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-world",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-world/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-world/resolve/main/yolov8s-worldv2.om",
        "primaryDownloadLabel": "yolov8s-worldv2.om",
        "downloads": [
            {
                "title": "yolov8s-worldv2.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-world/resolve/main/yolov8s-worldv2.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "yolov8s-worldv2.om",
                "performance": [
                    {
                        "value": "103.419",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "41.71",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "139.937",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "47.867",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov8s-worldv2_FP16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-world/resolve/main/yolov8s-worldv2_FP16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "yolov8s-worldv2_FP16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "48.415",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "20.64",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "442.179",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "132.621",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov8s-worldv2_svp_nnn.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-world/resolve/main/yolov8s-worldv2_svp_nnn.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov8s-worldv2_svp_nnn.onnx"
            },
            {
                "title": "yolov8s-worldv2.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-world/resolve/main/yolov8s-worldv2.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov8s-worldv2.pt"
            },
            {
                "title": "yolov8s-worldv20_nnn.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-world/resolve/main/yolov8s-worldv20_nnn.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov8s-worldv20_nnn.onnx"
            },
            {
                "title": "text_feature.zip",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-world/resolve/main/text_feature.zip",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "text_feature.zip"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "jcvo6ap4tk00",
        "name": "Vit-B-16",
        "description": "Vision Transformer（ViT）模型在计算机视觉领域中对CNN的依赖不是必需的，直接将其应用于图像块序列来进行图像分类时，也能得到和目前卷积网络相媲美的准确率。",
        "descriptionZh": "Vision Transformer（ViT）模型在计算机视觉领域中对CNN的依赖不是必需的，直接将其应用于图像块序列来进行图像分类时，也能得到和目前卷积网络相媲美的准确率。",
        "descriptionEn": "Vit-B-16 is a computer vision model for classification. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-04-14 16:32:53",
        "updatedAt": "2026-05-12 19:06:21",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "assets/images/1701276106686467_20250915111221_469_20.png",
        "coverImageUrl": "assets/images/1701276106686467_20250915111221_469_20.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/Vit-B-16",
        "licenseUrl": "https://github.com/huggingface/pytorch-image-models/blob/main/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/Vit-B-16",
        "quickStartMarkdownUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/Vit-B-16/",
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "Vit-B-16模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n  EnvInit();\n  std::string omModelPath = \"/path/to/model.om\"; // Vit-B-16模型文件路径 \n  std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n  std::unique_ptr<Model> model = std::make_unique<Model>();\n  if (model->Load(omModelPath, ModelType::ResNet50) != 0) {\n    LOG(ERROR) << \"fail to load model\";\n    return -1;\n  }\n  auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n  if (ret.size() == 0) {\n    LOG(ERROR) << \"fail to infer model\";\n    model->Unload();\n    return -1;\n  }\n  if (model->Unload() != 0) {\n    LOG(ERROR) << \"fail to unload model\";\n    return -1;\n  }\n  EnvDeinit();\n  return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/Vit-B-16/src/CMakeLists.txt)。",
                "summary": "Vit-B-16模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for Vit-B-16. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "计算量",
                "value": "35.994GFLOPs"
            },
            {
                "name": "输入",
                "value": "224x224"
            },
            {
                "name": "参数量",
                "value": "86.568M"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "23.515",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "42.527",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "259.363",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "92.973",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "45.23",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "22.11",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "309.008",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "396.914",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "vit_base_patch16_224.pt",
                "size": "330 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16/resolve/main/vit_base_patch16_224.pt",
                "available": true,
                "localFile": "vit_base_patch16_224.pt"
            },
            {
                "name": "vit_base_patch16_224_bs1.onnx",
                "size": "330 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16/resolve/main/vit_base_patch16_224_bs1.onnx",
                "available": true,
                "localFile": "vit_base_patch16_224_bs1.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-vit-b-16",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16/resolve/main/vit_base_patch16_224.om",
        "primaryDownloadLabel": "vit_base_patch16_224.om",
        "downloads": [
            {
                "title": "vit_base_patch16_224.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16/resolve/main/vit_base_patch16_224.om",
                "available": true,
                "source": "om-A16W8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "vit_base_patch16_224.om",
                "performance": [
                    {
                        "value": "23.515",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "42.527",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "259.363",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "92.973",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "vit_base_patch16_224_FP16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16/resolve/main/vit_base_patch16_224_FP16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "vit_base_patch16_224_FP16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "45.23",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "22.11",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "309.008",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "396.914",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "vit_base_patch16_224.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16/resolve/main/vit_base_patch16_224.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "vit_base_patch16_224.pt"
            },
            {
                "title": "vit_base_patch16_224_bs1.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16/resolve/main/vit_base_patch16_224_bs1.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "vit_base_patch16_224_bs1.onnx"
            },
            {
                "title": "CANN配置",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具库",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "j9brj6ooi000",
        "name": "YOLOv9s",
        "description": "YOLOv9s 是 Ultralytics 推出的目标检测模型，采用了 GELAN 架构和 PGI 训练策略。相比于之前的版本，YOLOv9 在保持高效推理的同时，通过可编程梯度信息（PGI）进一步提升了检测精度。该模型在 COCO 数据集上进行了训练和验证。",
        "descriptionZh": "YOLOv9s 是 Ultralytics 推出的目标检测模型，采用了 GELAN 架构和 PGI 训练策略。相比于之前的版本，YOLOv9 在保持高效推理的同时，通过可编程梯度信息（PGI）进一步提升了检测精度。该模型在 COCO 数据集上进行了训练和验证。",
        "descriptionEn": "YOLOv9s is a computer vision model for object detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-04-03 10:29:46",
        "updatedAt": "2026-04-08 16:07:07",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "assets/images/1737486946598914_202103071025384.jpg",
        "coverImageUrl": "assets/images/1737486946598914_202103071025384.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/Hispark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov9s",
        "licenseUrl": "https://github.com/ultralytics/ultralytics/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/Hispark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov9s",
        "quickStartMarkdownUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov9s/README.md",
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "#include <memory>\n#include \"model.h\"\n#include \"log.h\"\n#include \"utils.h\"\n\nusing namespace Infer;\n\nint main(int argc, char *argv[])\n{\n    InferParam inferParam;\n    if (!ParseParamFromCmd(argc, argv, inferParam)) {\n        LOG(ERROR) << \"fail to parse cmd\";\n        return -1;\n    }\n    EnvInit(inferParam.aclConfigPath);\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(inferParam.omModelPath, Infer::Yolov9s) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(inferParam.imglistPath);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        EnvDeinit();\n        return -1;\n    }\n    ret.clear();\n    ret.shrink_to_fit();\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        EnvDeinit();\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}",
                "summary": "#include <memory>",
                "summaryEn": "C++ quick-start notes for YOLOv9s. Covers runtime initialization, model loading, inference execution, configuration handling, and build instructions."
            }
        ],
        "detailParams": [
            {
                "name": "计算量",
                "value": "29.526 GFLOPs"
            },
            {
                "name": "输入",
                "value": "640x640"
            },
            {
                "name": "参数量",
                "value": "7.240 M"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "28.185",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "35.48",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "180.745",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "49.863",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "55.340",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "18.07",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "345.718",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "122.281",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "yolov9s.pt",
                "size": "14.7 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov9s/resolve/main/yolov9s.pt",
                "available": true,
                "localFile": "yolov9s.pt"
            },
            {
                "name": "yolov9s.onnx",
                "size": "27.8 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov9s/resolve/main/yolov9s.onnx",
                "available": true,
                "localFile": "yolov9s.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolov9s",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov9s",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov9s/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov9s/resolve/main/yolov9s.om",
        "primaryDownloadLabel": "yolov9s.om",
        "downloads": [
            {
                "title": "yolov9s.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov9s/resolve/main/yolov9s.om",
                "available": true,
                "source": "om-A16W8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "yolov9s.om",
                "performance": [
                    {
                        "value": "28.185",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "35.48",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "180.745",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "49.863",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov9s_FP16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov9s/resolve/main/yolov9s_FP16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "yolov9s_FP16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "55.340",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "18.07",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "345.718",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "122.281",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov9s.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov9s/resolve/main/yolov9s.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov9s.pt"
            },
            {
                "title": "yolov9s.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov9s/resolve/main/yolov9s.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov9s.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "j918qkd0tk00",
        "name": "PaddleOCRv4-rec",
        "description": "PP-OCRv4识别模型在PP-OCRv3的基础上进一步升级。整体的框架保持了与PP-OCRv3识别模型相同的pipeline，分别进行了数据、网络结构、训练策略等方面的优化。",
        "descriptionZh": "PP-OCRv4识别模型在PP-OCRv3的基础上进一步升级。整体的框架保持了与PP-OCRv3识别模型相同的pipeline，分别进行了数据、网络结构、训练策略等方面的优化。",
        "descriptionEn": "PaddleOCRv4-rec is a computer vision model for OCR. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-04-02 09:49:40",
        "updatedAt": "2026-04-08 16:07:07",
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 SVP_NNN引擎上模型性能待优化",
        "category": "计算机视觉",
        "tags": [
            "OCR"
        ],
        "image": "assets/images/1719966200037379______20251227174303.png",
        "coverImageUrl": "assets/images/1719966200037379______20251227174303.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/ocr/PaddleOCRv4-rec",
        "licenseUrl": "https://github.com/PaddlePaddle/PaddleOCR/blob/release/2.10/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/ocr/PaddleOCRv4-rec/",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "PaddleOCRv4-rec模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n  EnvInit();\n  std::string omModelPath = \"/path/to/model.om\"; // PaddleOCRv4-rec模型文件路径 \n  std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n  std::unique_ptr<Model> model = std::make_unique<Model>();\n  if (model->Load(omModelPath, ModelType::PaddleOCR_Rec) != 0) {\n    LOG(ERROR) << \"fail to load model\";\n    return -1;\n  }\n  auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n  if (ret.size() == 0) {\n    LOG(ERROR) << \"fail to infer model\";\n    model->Unload();\n    return -1;\n  }\n  if (model->Unload() != 0) {\n    LOG(ERROR) << \"fail to unload model\";\n    return -1;\n  }\n  EnvDeinit();\n  return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于[/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)]目录下，编译相关配置参考[CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/ocr/PaddleOCRv4-rec/src/CMakeLists.txt)]。",
                "summary": "PaddleOCRv4-rec模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for PaddleOCRv4-rec. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "960x960"
            },
            {
                "name": "参数量",
                "value": "3.476M"
            },
            {
                "name": "计算量",
                "value": "24.83GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "11.045",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "90.54",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "76.95",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "12.343",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "22.163",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "45.12",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "219.498",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "238.387",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "ch_ptocr_v4_rec_infer.pth",
                "size": "25.7 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-rec/resolve/main/ch_ptocr_v4_rec_infer.pth",
                "available": true,
                "localFile": "ch_ptocr_v4_rec_infer.pth"
            },
            {
                "name": "ch_ptocr_v4_rec_simplified.onnx",
                "size": "25.2 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-rec/resolve/main/ch_ptocr_v4_rec_simplified.onnx",
                "available": true,
                "localFile": "ch_ptocr_v4_rec_simplified.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-paddleocrv4-rec",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-rec",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-rec/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-rec/resolve/main/rec.om",
        "primaryDownloadLabel": "rec.om",
        "downloads": [
            {
                "title": "rec.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-rec/resolve/main/rec.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "rec.om",
                "performance": [
                    {
                        "value": "11.045",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "90.54",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "76.95",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "12.343",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "rec_FP16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-rec/resolve/main/rec_FP16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "rec_FP16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "22.163",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "45.12",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "219.498",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "238.387",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "ch_ptocr_v4_rec_infer.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-rec/resolve/main/ch_ptocr_v4_rec_infer.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "ch_ptocr_v4_rec_infer.pth"
            },
            {
                "title": "ch_ptocr_v4_rec_simplified.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-rec/resolve/main/ch_ptocr_v4_rec_simplified.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "ch_ptocr_v4_rec_simplified.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "j8pr351otk00",
        "name": "YOLOv5s",
        "description": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLOv5网络模型在继承了原有YOLO网络模型优点的基础上，具有更优的检测精度和更快的推理速度。本示例使用YOLOv5s。",
        "descriptionZh": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLOv5网络模型在继承了原有YOLO网络模型优点的基础上，具有更优的检测精度和更快的推理速度。本示例使用YOLOv5s。",
        "descriptionEn": "YOLOv5s is a computer vision model for object detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-04-01 16:31:00",
        "updatedAt": "2026-04-08 16:07:07",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "assets/images/1701484647481346_yolov5s.jpg",
        "coverImageUrl": "assets/images/1701484647481346_yolov5s.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov5",
        "licenseUrl": "https://github.com/ultralytics/yolov5/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov5",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "yolov5模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // yolov5模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::Yolov5) != 0) {\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov5/src/CMakeLists.txt)。",
                "summary": "yolov5模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for YOLOv5s. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "640x640"
            },
            {
                "name": "参数量",
                "value": "7.226M"
            },
            {
                "name": "计算量",
                "value": "18.066GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "11.69",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "85.53",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "45.99",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "29.395",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "28.137",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "35.54",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "204.298",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "66.164",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "yolov5s.pt",
                "size": "14.1 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov5s/resolve/main/yolov5s.pt",
                "available": true,
                "localFile": "yolov5s.pt"
            },
            {
                "name": "yolov5s.onnx",
                "size": "27.6 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov5s/resolve/main/yolov5s.onnx",
                "available": true,
                "localFile": "yolov5s.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolov5s",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov5s",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov5s/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov5s/resolve/main/yolov5s.om",
        "primaryDownloadLabel": "yolov5s.om",
        "downloads": [
            {
                "title": "yolov5s.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov5s/resolve/main/yolov5s.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "yolov5s.om",
                "performance": [
                    {
                        "value": "11.69",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "85.53",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "45.99",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "29.395",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov5s_FP16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov5s/resolve/main/yolov5s_FP16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "yolov5s_FP16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "28.137",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "35.54",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "204.298",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "66.164",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov5s.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov5s/resolve/main/yolov5s.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov5s.pt"
            },
            {
                "title": "yolov5s.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov5s/resolve/main/yolov5s.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov5s.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "j8pkk8lctk00",
        "name": "YOLOv3",
        "description": "YOLOv3是一种端到端的one-stage目标检测模型。相比YOLOv2，YOLOv3采用了一个新的backbone-Darknet-53来进行特征提取工作，这个新网络比Darknet-19更加强大，也比ResNet-101或者ResNet-152更加高效。",
        "descriptionZh": "YOLOv3是一种端到端的one-stage目标检测模型。相比YOLOv2，YOLOv3采用了一个新的backbone-Darknet-53来进行特征提取工作，这个新网络比Darknet-19更加强大，也比ResNet-101或者ResNet-152更加高效。",
        "descriptionEn": "YOLOv3 is a computer vision model for object detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 8 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-04-01 16:02:45",
        "updatedAt": "2026-04-08 16:07:07",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "assets/images/1712022653894659_om.jpg",
        "coverImageUrl": "assets/images/1712022653894659_om.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov3",
        "licenseUrl": "https://github.com/ultralytics/yolov3/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov3/",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n  EnvInit();\n  std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n  std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n  std::unique_ptr<Model> model = std::make_unique<Model>();\n  if (model->Load(omModelPath, ModelType::Yolov3) != 0) {\n    LOG(ERROR) << \"fail to load model\";\n    return -1;\n  }\n  auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n  if (ret.size() == 0) {\n    LOG(ERROR) << \"fail to infer model\";\n    model->Unload();\n    return -1;\n  }\n  if (model->Unload() != 0) {\n    LOG(ERROR) << \"fail to unload model\";\n    return -1;\n  }\n  EnvDeinit();\n  return 0;\n}\n\n备注：上述C++代码依赖的动态库与头文件位于[/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)]目录下，编译相关配置参考[CMakeLists.txt (https://gitee.com/HiSpark/modelzoo-dev/tree/master/samples/samples_GPL/built-in/yolov3/src/CMakeLists.txt)]。",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for YOLOv3. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "640x640"
            },
            {
                "name": "参数量",
                "value": "61.923M"
            },
            {
                "name": "计算量",
                "value": "3.002GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "57.15",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "17.5",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "148.001",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "86.848",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "130.05",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "7.69",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "80.735",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "346.551",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "yolov3.pt",
                "size": "119 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3/resolve/main/yolov3.pt",
                "available": true,
                "localFile": "yolov3.pt"
            },
            {
                "name": "yolov3_sim.onnx",
                "size": "236 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3/resolve/main/yolov3_sim.onnx",
                "available": true,
                "localFile": "yolov3_sim.onnx"
            },
            {
                "name": "yolov3.onnx",
                "size": "236 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3/resolve/main/yolov3.onnx",
                "available": true,
                "localFile": "yolov3.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolov3",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3/resolve/main/yolov3.om",
        "primaryDownloadLabel": "yolov3.om",
        "downloads": [
            {
                "title": "yolov3.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3/resolve/main/yolov3.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "yolov3.om",
                "performance": [
                    {
                        "value": "57.15",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "17.5",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "148.001",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "86.848",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov3_FP16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3/resolve/main/yolov3_FP16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "yolov3_FP16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "130.05",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "7.69",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "80.735",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "346.551",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov3.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3/resolve/main/yolov3.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov3.pt"
            },
            {
                "title": "yolov3_sim.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3/resolve/main/yolov3_sim.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov3_sim.onnx"
            },
            {
                "title": "yolov3.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3/resolve/main/yolov3.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov3.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "j8pj2ts0i000",
        "name": "PaddleOCRv4-det",
        "description": "PP-OCRv4检测模型在PP-OCRv3检测模型的基础上，在网络结构，训练策略，蒸馏策略三个方面做了优化。首先，PP-OCRv4检测模型使用PP-LCNetV3替换MobileNetv3，并提出并行分支融合的PFhead结构；其次，训练时动态调整shrink ratio的比例；最后，PP-OCRv4对CML的蒸馏loss进行优化，进一步提升文字检测效果。",
        "descriptionZh": "PP-OCRv4检测模型在PP-OCRv3检测模型的基础上，在网络结构，训练策略，蒸馏策略三个方面做了优化。首先，PP-OCRv4检测模型使用PP-LCNetV3替换MobileNetv3，并提出并行分支融合的PFhead结构；其次，训练时动态调整shrink ratio的比例；最后，PP-OCRv4对CML的蒸馏loss进行优化，进一步提升文字检测效果。",
        "descriptionEn": "PaddleOCRv4-det is a computer vision model for OCR. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 6 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-04-01 15:56:01",
        "updatedAt": "2026-04-08 16:07:07",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "OCR"
        ],
        "image": "assets/images/1719770449772547_ocr.jpg",
        "coverImageUrl": "assets/images/1719770449772547_ocr.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/ocr/PaddleOCRv4-det",
        "licenseUrl": "https://github.com/PaddlePaddle/PaddleOCR/blob/release/2.10/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/ocr/PaddleOCRv4-det",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "PaddleOCRv4-det模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // PaddleOCRv4-det模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::PaddleOCR_Det) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于[/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)]目录下，编译相关配置参考[CMakeLists.txt (https://gitee.com/HiSpark/modelzoo-dev/tree/master/samples/samples_GPL/built-in/yolov3/src/CMakeLists.txt)]。",
                "summary": "PaddleOCRv4-det模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for PaddleOCRv4-det. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "960x960"
            },
            {
                "name": "参数量",
                "value": "3.476M"
            },
            {
                "name": "计算量",
                "value": "24.83GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "69.686",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "14.35",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "555.06",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "100.082",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "279.77",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "3.57",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "1995.893",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "203.766",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "ch_ptocr_v4_det_infer.pth",
                "size": "13.8 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-det/resolve/main/ch_ptocr_v4_det_infer.pth",
                "available": true,
                "localFile": "ch_ptocr_v4_det_infer.pth"
            },
            {
                "name": "ch_ptocr_v4_det_simplified.onnx",
                "size": "13.3 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-det/resolve/main/ch_ptocr_v4_det_simplified.onnx",
                "available": true,
                "localFile": "ch_ptocr_v4_det_simplified.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-paddleocrv4-det",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-det",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-det/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-det/resolve/main/det.om",
        "primaryDownloadLabel": "det.om",
        "downloads": [
            {
                "title": "det.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-det/resolve/main/det.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "det.om",
                "performance": [
                    {
                        "value": "69.686",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "14.35",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "555.06",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "100.082",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "det_FP16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-det/resolve/main/det_FP16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "det_FP16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "279.77",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "3.57",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "1995.893",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "203.766",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "ch_ptocr_v4_det_infer.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-det/resolve/main/ch_ptocr_v4_det_infer.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "ch_ptocr_v4_det_infer.pth"
            },
            {
                "title": "ch_ptocr_v4_det_simplified.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-det/resolve/main/ch_ptocr_v4_det_simplified.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "ch_ptocr_v4_det_simplified.onnx"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "j8hn2954tk00",
        "name": "Chinese-CLIP",
        "description": "Chinese-CLIP 是 CLIP 模型的中文版本。CLIP 通过对比学习方式，同时学习图像和文本的表示，并能够理解两者之间的语义关联。Chinese-CLIP 使用约 2 亿规模的中文图文对进行训练，其核心目标是解决中文场景下的跨模态检索、图像表示生成等任务。",
        "descriptionZh": "Chinese-CLIP 是 CLIP 模型的中文版本。CLIP 通过对比学习方式，同时学习图像和文本的表示，并能够理解两者之间的语义关联。Chinese-CLIP 使用约 2 亿规模的中文图文对进行训练，其核心目标是解决中文场景下的跨模态检索、图像表示生成等任务。",
        "descriptionEn": "Chinese-CLIP is a multimodal model for image-text matching. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 12 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-03-31 21:34:55",
        "updatedAt": null,
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 NNN引擎上模型精度和性能待进一步优化。",
        "category": "多模态",
        "tags": [
            "图文匹配"
        ],
        "image": "assets/images/1734291744751619_clip.png",
        "coverImageUrl": "assets/images/1734291744751619_clip.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/Chinese-CLIP",
        "licenseUrl": "https://github.com/OFA-Sys/Chinese-CLIP/blob/master/MIT-LICENSE.txt",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/Chinese-CLIP",
        "quickStartMarkdownUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/Chinese-CLIP/doc/%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B.md",
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "Chinese-CLIP模型可以通过以下代码完成快速推理\n\nusing namespace Infer;\n\nint main(int argc, char* argv[])\n{\n    ClipInfer model;\n    if (!model.ExecuteParams(argc, argv)) {\n        LOG(ERROR) << \"Fail to parse cmd!\";\n        return -1;\n    }\n    EnvInit(model.acl_path_);\n    model.LoadModel();\n    std::vector<std::vector<float>> zeroshotWeights = model.InferTxt();\n    for (size_t i = 0; i < model.imgFileList_.size(); ++i)\n    {\n        std::vector<float> imgResult = model.InferImageSingle(model.imgFileList_[i][0]);\n        std::vector<float> tmp = model.ComputeModelLogits(imgResult, zeroshotWeights, 512, model.txtFileList_.size(), model.imgFileList_[i][0]);\n    }\n    model.UnLoadModel();\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码仅展示了主要流程，详细实现请参考Chinese-CLIP (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/Chinese-CLIP)。",
                "summary": "Chinese-CLIP模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for Chinese-CLIP. Covers runtime initialization and inference execution."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "224x224"
            },
            {
                "name": "参数量",
                "value": "86.193M"
            },
            {
                "name": "计算量",
                "value": "36.381GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "89.754",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "11.142",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "573.585",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "91.703",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "1049.88",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "0.95",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "8372.353",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "506.328",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "vit-b-16_img_sim_NNN.onnx",
                "size": "332 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/vit-b-16_img_sim_NNN.onnx",
                "available": true,
                "localFile": "vit-b-16_img_sim_NNN.onnx"
            },
            {
                "name": "vit-b-16_txt_sim_NNN.onnx",
                "size": "394 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/vit-b-16_txt_sim_NNN.onnx",
                "available": true,
                "localFile": "vit-b-16_txt_sim_NNN.onnx"
            },
            {
                "name": "vit-b-16_img_sim_SVP_NNN.onnx",
                "size": "332 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/vit-b-16_img_sim_SVP_NNN.onnx",
                "available": true,
                "localFile": "vit-b-16_img_sim_SVP_NNN.onnx"
            },
            {
                "name": "vit-b-16_txt_sim_SVP_NNN.onnx",
                "size": "394 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/vit-b-16_txt_sim_SVP_NNN.onnx",
                "available": true,
                "localFile": "vit-b-16_txt_sim_SVP_NNN.onnx"
            },
            {
                "name": "clip_cn_vit-b-16.pt",
                "size": "718 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/clip_cn_vit-b-16.pt",
                "available": true,
                "localFile": "clip_cn_vit-b-16.pt"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-chinese-clip",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/clip_img.om",
        "primaryDownloadLabel": "clip_img.om",
        "downloads": [
            {
                "title": "clip_img.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/clip_img.om",
                "available": true,
                "source": "om-A16W8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "clip_img.om",
                "performance": [
                    {
                        "value": "89.754",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "11.142",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "573.585",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "91.703",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "clip_text.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/clip_text.om",
                "available": true,
                "source": "om-A16W8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "clip_text.om",
                "performance": [
                    {
                        "value": "89.754",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "11.142",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "573.585",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "91.703",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "clip_img_FP16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/clip_img_FP16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "clip_img_FP16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "1049.88",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "0.95",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "8372.353",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "506.328",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "clip_text_FP16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/clip_text_FP16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "clip_text_FP16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "1049.88",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "0.95",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "8372.353",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "506.328",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "vit-b-16_img_sim_NNN.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/vit-b-16_img_sim_NNN.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "vit-b-16_img_sim_NNN.onnx"
            },
            {
                "title": "vit-b-16_txt_sim_NNN.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/vit-b-16_txt_sim_NNN.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "vit-b-16_txt_sim_NNN.onnx"
            },
            {
                "title": "vit-b-16_img_sim_SVP_NNN.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/vit-b-16_img_sim_SVP_NNN.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "vit-b-16_img_sim_SVP_NNN.onnx"
            },
            {
                "title": "vit-b-16_txt_sim_SVP_NNN.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/vit-b-16_txt_sim_SVP_NNN.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "vit-b-16_txt_sim_SVP_NNN.onnx"
            },
            {
                "title": "clip_cn_vit-b-16.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/clip_cn_vit-b-16.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "clip_cn_vit-b-16.pt"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "j6v87p1oi000",
        "name": "DeepSort",
        "description": "DeepSort是一种多目标跟踪方法，简单有效。该方法将外观信息集成起来，提高了分拣性能，能够在较长遮挡时间下仍能进行有效的跟踪。该框架将大量的复杂计算放入离线预训练阶段，这个阶段在重识别数据集上学习一个深度关联度量。在线应用阶段，建立度量，在视觉外观空间中使用最近邻查询跟踪关联。本模型能够在较快帧率下实现较高精度的识别。",
        "descriptionZh": "DeepSort是一种多目标跟踪方法，简单有效。该方法将外观信息集成起来，提高了分拣性能，能够在较长遮挡时间下仍能进行有效的跟踪。该框架将大量的复杂计算放入离线预训练阶段，这个阶段在重识别数据集上学习一个深度关联度量。在线应用阶段，建立度量，在视觉外观空间中使用最近邻查询跟踪关联。本模型能够在较快帧率下实现较高精度的识别。",
        "descriptionEn": "DeepSort is a computer vision model for multi-object tracking. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 9 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-03-26 23:59:38",
        "updatedAt": "2026-03-27 19:43:15",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "多目标跟踪"
        ],
        "image": "assets/images/1736139606130691_20260326235720.jpg",
        "coverImageUrl": "assets/images/1736139606130691_20260326235720.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/tracking/deepsort",
        "licenseUrl": "https://github.com/ZQPei/deep_sort_pytorch/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/tracking/deepsort",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\nint main(int argc, char **argv) {\n  if (argc < 4) {\n    std::cerr << \"Usage: ./main <yolov5.om> <resnet18.om> \"\n           \"<image_dir_or_file> [config.json]\" << std::endl;\n    return -1;\n  }\n\n  // 初始化 NPU 驱动设备\n  if (Infer::DevInit(\"\") != Infer::SUCCESS) {\n    std::cerr << \"Device Init Failed.\" << std::endl;\n    return -1;\n  }\n\n  // 构建默认超参数配置\n  DeepSORTConfig config;\n  config.yoloModelPath = argv[1];\n  config.resnetModelPath = argv[2];\n  config.yoloConfThres = 0.3f;\n  config.yoloNmsThres = 0.4f;\n  config.maxCosineDistance = 0.15f;\n  config.nnBudget = 100;\n\n  // 卡尔曼滤波器数学对齐自检\n  RunKalmanParityCheck();\n  std::string configPath = (argc > 4) ? argv[4] : \"\";\n  if (!configPath.empty()) {\n    LoadConfigFromJson(configPath, config);\n  }\n\n  std::string inputPath = argv[3];\n  std::string outFilename = BuildOutputFilename(inputPath);\n  {\n    DeepSortController deepSort(config);\n    if (deepSort.Init() != Infer::SUCCESS) {\n      std::cerr << \"DeepSort Init Failed.\" << std::endl;\n      Infer::DevDeInit();\n      return -1;\n    }\n\n    std::vector<std::string> framePaths = GetFramePaths(inputPath);\n    if (framePaths.empty()) {\n      std::cerr << \"No image files found in: \" << inputPath << std::endl;\n      Infer::DevDeInit();\n      return -1;\n    }\n\n    RunTrackingPipeline(deepSort, framePaths, outFilename);\n  }\n\n  Infer::DevDeInit();\n  return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/tracking/deepsort/CMakeLists.txt)。",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for DeepSort. Covers runtime initialization, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "计算量",
                "value": "2.253GFLOPs"
            },
            {
                "name": "输入",
                "value": "128x64"
            },
            {
                "name": "参数量",
                "value": "11.164M"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "1.443",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "693.28",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "59.863",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "14.186",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "70.49",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "157.676",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "yolov5s.onnx",
                "size": "27.6 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/yolov5s.onnx",
                "available": true,
                "localFile": "yolov5s.onnx"
            },
            {
                "name": "reid_net.onnx",
                "size": "42.6 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/reid_net.onnx",
                "available": true,
                "localFile": "reid_net.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-deepsort",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/yolov5s.om",
        "primaryDownloadLabel": "yolov5s.om",
        "downloads": [
            {
                "title": "yolov5s.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/yolov5s.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "yolov5s.om",
                "performance": [
                    {
                        "value": "1.443",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "693.28",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "59.863",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "reid_net.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/reid_net.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "reid_net.om",
                "performance": [
                    {
                        "value": "1.443",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "693.28",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "59.863",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov5s_FP16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/yolov5s_FP16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "yolov5s_FP16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "14.186",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "70.49",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "157.676",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "reid_net_FP16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/reid_net_FP16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "reid_net_FP16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "14.186",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "70.49",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "157.676",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov5s.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/yolov5s.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov5s.onnx"
            },
            {
                "title": "reid_net.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/reid_net.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "reid_net.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://hf-mirror.com/shadow-cann/svp-nnn-pc/resolve/main/SVP_NNN_PC_V1.0.6.5.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.5.tgz"
            },
            {
                "title": "编译工具库",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "j67cjvq5vs00",
        "name": "MobileNetV2",
        "description": "MobileNetV2是对MobileNetV1的改进，是一种轻量级的神经网络。MobileNetV2保留了V1版本的深度可分离卷积，增加了线性瓶颈（Linear Bottleneck）和倒残差（Inverted Residual）。",
        "descriptionZh": "MobileNetV2是对MobileNetV1的改进，是一种轻量级的神经网络。MobileNetV2保留了V1版本的深度可分离卷积，增加了线性瓶颈（Linear Bottleneck）和倒残差（Inverted Residual）。",
        "descriptionEn": "MobileNetV2 is a computer vision model for classification. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-03-24 16:23:20",
        "updatedAt": "2026-03-26 09:35:37",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "assets/images/1700942949056514_mobilev2.png",
        "coverImageUrl": "assets/images/1700942949056514_mobilev2.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/MobileNetV2",
        "licenseUrl": "https://github.com/pytorch/vision/blob/v0.14.0/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/MobileNetV2",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "MobileNetV2可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // MobileNetV2 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::MobileNetV2) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/MobileNetV2/src/CMakeLists.txt)",
                "summary": "MobileNetV2可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme",
                "summaryEn": "C++ quick-start notes for MobileNetV2. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "input",
                "value": "3x224x224"
            },
            {
                "name": "参数量",
                "value": "3.488M"
            },
            {
                "name": "计算量",
                "value": "0.640GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "78.209",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "1278.63",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "4.11",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "6.727",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "3.207",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "311.8",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "38.008",
                        "unit": "单帧带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "65.434",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "mobilenet_v2-b0353104.pth",
                "size": "13.6 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-mobilenetv2/resolve/main/mobilenet_v2-b0353104.pth",
                "available": true,
                "localFile": "mobilenet_v2-b0353104.pth"
            },
            {
                "name": "mobilenetV2.onnx",
                "size": "13.3 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-mobilenetv2/resolve/main/mobilenetV2.onnx",
                "available": true,
                "localFile": "mobilenetV2.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-mobilenetv2",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-mobilenetv2",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-mobilenetv2/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-mobilenetv2/resolve/main/mobileNetV2.om",
        "primaryDownloadLabel": "mobileNetV2.om",
        "downloads": [
            {
                "title": "mobileNetV2.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-mobilenetv2/resolve/main/mobileNetV2.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "mobileNetV2.om",
                "performance": [
                    {
                        "value": "78.209",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "1278.63",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "4.11",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "6.727",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "mobileNetV2_fp16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-mobilenetv2/resolve/main/mobileNetV2_fp16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-fp16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "mobileNetV2_fp16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "3.207",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "311.8",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "38.008",
                        "unit": "单帧带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "65.434",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "mobilenet_v2-b0353104.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-mobilenetv2/resolve/main/mobilenet_v2-b0353104.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "mobilenet_v2-b0353104.pth"
            },
            {
                "title": "mobilenetV2.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-mobilenetv2/resolve/main/mobilenetV2.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "mobilenetV2.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "j3n1o7csso00",
        "name": "SuperPoint",
        "description": "SuperPoint模型的全卷积神经网络架构对全尺寸图像进行操作，并在单次前向传递中产生伴随固定长度描述符的兴趣点检测。该模型有一个单一的共享编码器来处理和减少输入图像的维数。在编码器之后，该架构分成两个解码器“头”，它们学习任务特定权重——一个用于兴趣点检测，另一个用于感兴趣点描述。大多数网络参数在两个任务之间共享，这与传统系统不同，传统系统首先检测兴趣点，然后计算描述符，并且缺乏跨两个任务共享计算和表示的能力。",
        "descriptionZh": "SuperPoint模型的全卷积神经网络架构对全尺寸图像进行操作，并在单次前向传递中产生伴随固定长度描述符的兴趣点检测。该模型有一个单一的共享编码器来处理和减少输入图像的维数。在编码器之后，该架构分成两个解码器“头”，它们学习任务特定权重——一个用于兴趣点检测，另一个用于感兴趣点描述。大多数网络参数在两个任务之间共享，这与传统系统不同，传统系统首先检测兴趣点，然后计算描述符，并且缺乏跨两个任务共享计算和表示的能力。",
        "descriptionEn": "SuperPoint is a computer vision model for feature point detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-03-16 21:11:02",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "特征点检测"
        ],
        "image": "assets/images/1702559012290562_cat_320x240_draw_keypoints.jpg",
        "coverImageUrl": "assets/images/1702559012290562_cat_320x240_draw_keypoints.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/point/SuperPoint",
        "licenseUrl": "https://github.com/eric-yyjau/pytorch-superpoint/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/point/SuperPoint",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n    std::string filePath= \"/path/to/file_list.json\"; // 输入文本文件路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::SuperPoint) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(filePath, FileType::JsonFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码仅展示了主要流程，详细实现请参考SuperPoint (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/point/SuperPoint)。",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for SuperPoint. Covers runtime initialization, model loading, inference execution, configuration handling, and build instructions."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "240x320"
            },
            {
                "name": "参数量",
                "value": "1.24M"
            },
            {
                "name": "计算量",
                "value": "13.116GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "3.127",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "319.8",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "5.679",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "8.027",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "15.21",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "65.76",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "80.735",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "66.686",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "superpoint_bs1.onnx",
                "size": "5.0 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/resolve/main/superpoint_bs1.onnx",
                "available": true,
                "localFile": "superpoint_bs1.onnx"
            },
            {
                "name": "SuperPointNet.pth",
                "size": "15.0 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/resolve/main/SuperPointNet.pth",
                "available": true,
                "localFile": "SuperPointNet.pth"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-superpoint",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/resolve/main/superpoint_bs1.om",
        "primaryDownloadLabel": "superpoint_bs1.om",
        "downloads": [
            {
                "title": "superpoint_bs1.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/resolve/main/superpoint_bs1.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "superpoint_bs1.om",
                "performance": [
                    {
                        "value": "3.127",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "319.8",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "5.679",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "8.027",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "superpoint_bs1_FP16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/resolve/main/superpoint_bs1_FP16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "superpoint_bs1_FP16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "15.21",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "65.76",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "80.735",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "66.686",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "superpoint_bs1.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/resolve/main/superpoint_bs1.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "superpoint_bs1.onnx"
            },
            {
                "title": "SuperPointNet.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/resolve/main/SuperPointNet.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SuperPointNet.pth"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "link",
                "href": null,
                "available": false,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "j3mmucroso00",
        "name": "DenseNet121",
        "description": "DenseNet 针对 ResNet 的冗余结构提出了改进：让网络中的每一层和前面的所有层相连，同时把每一层设计的比较窄，使每一层学到的特征变少从而降低冗余。除了减少参数量之外，该结构还有减轻梯度消失问题、增强特征传播等优点。",
        "descriptionZh": "DenseNet 针对 ResNet 的冗余结构提出了改进：让网络中的每一层和前面的所有层相连，同时把每一层设计的比较窄，使每一层学到的特征变少从而降低冗余。除了减少参数量之外，该结构还有减轻梯度消失问题、增强特征传播等优点。",
        "descriptionEn": "DenseNet121 is a computer vision model for classification. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-03-16 20:23:49",
        "updatedAt": "2026-03-26 09:35:38",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "assets/images/1700942504460291_des.png",
        "coverImageUrl": "assets/images/1700942504460291_des.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/DenseNet121",
        "licenseUrl": "https://github.com/pytorch/vision/blob/v0.14.0/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/DenseNet121",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "DenseNet121可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // DenseNet121 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::DenseNet121) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/DenseNet121/src/CMakeLists.txt)",
                "summary": "DenseNet121可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme",
                "summaryEn": "C++ quick-start notes for DenseNet121. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "224x224"
            },
            {
                "name": "参数量",
                "value": "8.04M"
            },
            {
                "name": "计算量",
                "value": "6.369GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "5.935",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "168.49",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "20.391",
                        "unit": "内存（MB）",
                        "desc": ""
                    },
                    {
                        "value": "47.986",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "9.26",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "108.01",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "147.608",
                        "unit": "带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "99.133",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "densenet121.onnx",
                "size": "30.7 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121/resolve/main/densenet121.onnx",
                "available": true,
                "localFile": "densenet121.onnx"
            },
            {
                "name": "densenet121-a639ec97.pth",
                "size": "30.8 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121/resolve/main/densenet121-a639ec97.pth",
                "available": true,
                "localFile": "densenet121-a639ec97.pth"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-densenet121",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121/resolve/main/densenet121.om",
        "primaryDownloadLabel": "densenet121.om",
        "downloads": [
            {
                "title": "densenet121.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121/resolve/main/densenet121.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "densenet121.om",
                "performance": [
                    {
                        "value": "5.935",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "168.49",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "20.391",
                        "unit": "内存（MB）",
                        "desc": ""
                    },
                    {
                        "value": "47.986",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "densenet_dlite.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121/resolve/main/densenet_dlite.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "densenet_dlite.om",
                "performance": [
                    {
                        "value": "9.26",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "108.01",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "147.608",
                        "unit": "带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "99.133",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "densenet121.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121/resolve/main/densenet121.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "densenet121.onnx"
            },
            {
                "title": "densenet121-a639ec97.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121/resolve/main/densenet121-a639ec97.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "densenet121-a639ec97.pth"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "j3mlrvvlvs00",
        "name": "ShuffleNetV2",
        "description": "ShuffleNetV2是Shufflenet的升级版本，作为轻量级网络，通过遵循降低网络的碎片程度、减少element-wise等设计准则，在保证精度的前提下进一步追求高性能。",
        "descriptionZh": "ShuffleNetV2是Shufflenet的升级版本，作为轻量级网络，通过遵循降低网络的碎片程度、减少element-wise等设计准则，在保证精度的前提下进一步追求高性能。",
        "descriptionEn": "ShuffleNetV2 is a computer vision model for classification. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-03-16 20:19:07",
        "updatedAt": "2026-03-26 09:35:38",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "assets/images/1700942607089666_shu.png",
        "coverImageUrl": "assets/images/1700942607089666_shu.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/ShuffleNetV2",
        "licenseUrl": "https://github.com/pytorch/vision/blob/v0.14.0/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/ShuffleNetV2",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "ShuffleNetV2可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // ShuffleNetV2 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::ShuffleNetV2) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/ShuffleNetV2/src/CMakeLists.txt)",
                "summary": "ShuffleNetV2可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme",
                "summaryEn": "C++ quick-start notes for ShuffleNetV2. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "224x224"
            },
            {
                "name": "参数量",
                "value": "2.271M"
            },
            {
                "name": "计算量",
                "value": "0.298GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "2.495",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "400.867",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "10.823",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "5.359",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "3.92",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "255",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "30.142",
                        "unit": "带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "60.426",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "shufflenetv2_x1-5666bf0f80.pth",
                "size": "8.8 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/resolve/main/shufflenetv2_x1-5666bf0f80.pth",
                "available": true,
                "localFile": "shufflenetv2_x1-5666bf0f80.pth"
            },
            {
                "name": "shufflenetv2_fix.onnx",
                "size": "8.7 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/resolve/main/shufflenetv2_fix.onnx",
                "available": true,
                "localFile": "shufflenetv2_fix.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-shufflenetv2",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/resolve/main/shufflenetv2.om",
        "primaryDownloadLabel": "shufflenetv2.om",
        "downloads": [
            {
                "title": "shufflenetv2.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/resolve/main/shufflenetv2.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "shufflenetv2.om",
                "performance": [
                    {
                        "value": "2.495",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "400.867",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "10.823",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "5.359",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "shufflenetv2_dlite.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/resolve/main/shufflenetv2_dlite.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "shufflenetv2_dlite.om",
                "performance": [
                    {
                        "value": "3.92",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "255",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "30.142",
                        "unit": "带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "60.426",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "shufflenetv2_x1-5666bf0f80.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/resolve/main/shufflenetv2_x1-5666bf0f80.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "shufflenetv2_x1-5666bf0f80.pth"
            },
            {
                "title": "shufflenetv2_fix.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/resolve/main/shufflenetv2_fix.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "shufflenetv2_fix.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "j3m99qggso00",
        "name": "SqueezeNet1_1",
        "description": "Squeezenet的设计采用了卷积替换、减少卷积通道数和降采样操作后置等策略，旨在在不大幅降低模型精度的前提下，最大程度的提高运算速度。",
        "descriptionZh": "Squeezenet的设计采用了卷积替换、减少卷积通道数和降采样操作后置等策略，旨在在不大幅降低模型精度的前提下，最大程度的提高运算速度。",
        "descriptionEn": "SqueezeNet1_1 is a computer vision model for classification. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-03-16 19:24:13",
        "updatedAt": "2026-03-26 09:35:38",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "assets/images/1700942720335875_sq.png",
        "coverImageUrl": "assets/images/1700942720335875_sq.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/SqueezeNet1_1",
        "licenseUrl": "https://github.com/pytorch/vision/blob/v0.14.0/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/SqueezeNet1_1",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // SqueezeNet1_1 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::SqueezeNet1_1) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/ResNet50/src/CMakeLists.txt)",
                "summary": "可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme",
                "summaryEn": "C++ quick-start notes for SqueezeNet1_1. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "224x224"
            },
            {
                "name": "参数量",
                "value": "1.235M"
            },
            {
                "name": "计算量",
                "value": "0.715GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "0.502",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "1992.07",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "3.762",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "4.84",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "1.247",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "801.62",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "14.634",
                        "unit": "带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "50.066",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "squeezenet1_1-f364aa15.pth",
                "size": "4.7 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1/resolve/main/squeezenet1_1-f364aa15.pth",
                "available": true,
                "localFile": "squeezenet1_1-f364aa15.pth"
            },
            {
                "name": "squeezenet.onnx",
                "size": "4.7 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1/resolve/main/squeezenet.onnx",
                "available": true,
                "localFile": "squeezenet.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-squeezenet1-1",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1/resolve/main/squeezenet.om",
        "primaryDownloadLabel": "squeezenet.om",
        "downloads": [
            {
                "title": "squeezenet.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1/resolve/main/squeezenet.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "squeezenet.om",
                "performance": [
                    {
                        "value": "0.502",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "1992.07",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "3.762",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "4.84",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "squeezenet_FP16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1/resolve/main/squeezenet_FP16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "squeezenet_FP16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "1.247",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "801.62",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "14.634",
                        "unit": "带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "50.066",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "squeezenet1_1-f364aa15.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1/resolve/main/squeezenet1_1-f364aa15.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "squeezenet1_1-f364aa15.pth"
            },
            {
                "title": "squeezenet.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1/resolve/main/squeezenet.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "squeezenet.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "ivr055ncp400",
        "name": "Pi0",
        "description": "Pi0是一款视觉-语言-动作(VLA)通用机器人大模型，它基于预训练视觉语言模型(VLM)和流匹配(Flow Matching)机制，能够将自然语言指令直接转换为机器人可执行的连续动作序列，从而精准控制机器人完成复杂、高灵巧度的操作任务。",
        "descriptionZh": "Pi0是一款视觉-语言-动作(VLA)通用机器人大模型，它基于预训练视觉语言模型(VLM)和流匹配(Flow Matching)机制，能够将自然语言指令直接转换为机器人可执行的连续动作序列，从而精准控制机器人完成复杂、高灵巧度的操作任务。",
        "descriptionEn": "Pi0 is a computer vision model for embodied AI. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenEuler. Compute targets: Hi3591PV100. The mirror currently exposes 2 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-03-04 20:07:37",
        "updatedAt": "2026-03-06 17:34:59",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "具身智能"
        ],
        "image": "assets/images/1732223942393858_cover.png",
        "coverImageUrl": "assets/images/1732223942393858_cover.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenEuler"
        ],
        "computingPower": [
            "Hi3591PV100"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/embodied_intelligence/Pi0/README.md",
        "licenseUrl": "https://github.com/Physical-Intelligence/openpi/blob/main/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/embodied_intelligence/Pi0",
        "quickStartMarkdownUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/embodied_intelligence/Pi0/README.md",
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n  EnvInit();\n  std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n  std::string imagePath = \"/path/to/file_list_1.json\"; // 输入文本文件路径\n  std::unique_ptr<Model> model = std::make_unique<Model>();\n  if (model->Load(omModelPath, ModelType::Pi0) != 0) {\n    LOG(ERROR) << \"fail to load model\";\n    return -1;\n  }\n  auto ret = model->Infer(imagePath, FileType::JsonFile);\n  if (ret.size() == 0) {\n    LOG(ERROR) << \"fail to infer model\";\n    model->Unload();\n    return -1;\n  }\n  if (model->Unload() != 0) {\n    LOG(ERROR) << \"fail to unload model\";\n    return -1;\n  }\n  EnvDeinit();\n  return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/embodied_intelligence/Pi0/src/CMakeLists.txt)。",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for Pi0. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "计算量",
                "value": "1762.693GFLOPs"
            },
            {
                "name": "输入",
                "value": "1x48; 1x48; 1x14; 1x3x480x640"
            },
            {
                "name": "参数量",
                "value": "3152.177M"
            }
        ],
        "performance": [
            {
                "engine": "Hi3591PV100",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "221.48",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "4.52",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "7088.023",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "pi0.onnx",
                "size": "24.7 MB",
                "href": "https://hf-mirror.com/shadow-cann/pi0/resolve/main/pi0.onnx",
                "available": true,
                "localFile": "pi0.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/pi0",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/pi0",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/pi0/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/pi0/resolve/main/pi0.om",
        "primaryDownloadLabel": "pi0.om",
        "downloads": [
            {
                "title": "pi0.om",
                "href": "https://hf-mirror.com/shadow-cann/pi0/resolve/main/pi0.om",
                "available": true,
                "source": "om-fp16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3591PV100",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "pi0.om",
                "performance": [
                    {
                        "value": "221.48",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "4.52",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "7088.023",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "pi0.onnx",
                "href": "https://hf-mirror.com/shadow-cann/pi0/resolve/main/pi0.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "pi0.onnx"
            }
        ]
    },
    {
        "id": "ivcifqkd0400",
        "name": "ACT",
        "description": "ACT（Action Chunking with Transformers）是面向机器人学习场景的高性能端到端动作控制模型。相比传统模块化机器人控制模型，ACT采用轻量化Transformer架构作为核心骨干进行动作表征学习，结合多模态感知融合模块和时序动作优化网络，在控制精度和实时响应速度上均有显著提升。",
        "descriptionZh": "ACT（Action Chunking with Transformers）是面向机器人学习场景的高性能端到端动作控制模型。相比传统模块化机器人控制模型，ACT采用轻量化Transformer架构作为核心骨干进行动作表征学习，结合多模态感知融合模块和时序动作优化网络，在控制精度和实时响应速度上均有显著提升。",
        "descriptionEn": "ACT is a multimodal model for embodied AI. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenEuler. Compute targets: Hi3403V100 SVP_NNN. The mirror currently exposes 5 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-03-03 10:30:33",
        "updatedAt": "2026-03-04 16:06:22",
        "badge": null,
        "betaVersionDesc": "",
        "category": "多模态",
        "tags": [
            "具身智能"
        ],
        "image": "assets/images/1731868158459906_____.png",
        "coverImageUrl": "assets/images/1731868158459906_____.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenEuler"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/contribute/ACT/README.md",
        "licenseUrl": "https://github.com/tonyzhaozh/act/blob/main/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/contribute/ACT/SVP_NNN/src/main.cpp",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码生成可执行文件，并开放接口由python调用执行推理，以 SVP_NNN 推理引擎为例。\n#include <fstream>\n#include <iostream>\n#include \"sample_process.h\"\n#include \"utils.h\"\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // 初始化推理环境（只执行一次）\n    SampleProcess sample;\n    if (sample.InitResource() != SUCCESS) {\n        cerr << \"Init resource failed\" << endl;\n        return -1;\n    }\n\n    // 加载模型（只执行一次）\n    if (sample.LoadModel() != SUCCESS) {\n        cerr << \"Load model failed\" << endl;\n        sample.DestroyResource();\n        return -1;\n    }\n\n    // 循环处理多次输入\n    while (true) {\n        vector<const void*> input_datas;\n        vector<size_t> input_sizes;\n        const int INPUT_COUNT = 3;\n\n        // 读取输入数据（保持原有逻辑）\n        bool readSuccess = true;\n        for (int i = 0; i < INPUT_COUNT; ++i) {\n            uint32_t data_size;\n            cin.read(reinterpret_cast<char*>(&data_size), sizeof(data_size));\n            if (!cin.good()) {\n                cerr << \"Read input \" << i << \" size failed\" << endl;\n                readSuccess = false;\n                break;\n            }\n\n            void* data = nullptr;\n            svp_acl_error ret = svp_acl_rt_malloc(&data, data_size, SVP_ACL_MEM_MALLOC_NORMAL_ONLY);\n            if (ret != SVP_ACL_SUCCESS || data == nullptr) {\n                cerr << \"Malloc buffer for input \" << i << \" failed\" << endl;\n                readSuccess = false;\n                break;\n            }\n\n            cin.read(reinterpret_cast<char*>(data), data_size);\n            if (!cin.good()) {\n                cerr << \"Read input \" << i << \" data failed\" << endl;\n                svp_acl_rt_free(data);\n                readSuccess = false;\n                break;\n            }\n\n            input_datas.push_back(data);\n            input_sizes.push_back(data_size);\n        }\n\n        // 检查是否读取失败（比如到达输入末尾）\n        if (!readSuccess) {\n            // 释放已分配的内存\n            for (auto ptr : input_datas) svp_acl_rt_free(ptr);\n            break;\n        }\n\n        // 设置输入并执行推理\n        sample.SetInputDatas(input_datas, input_sizes);\n        if (sample.Process() != SUCCESS) {\n            cerr << \"Inference failed\" << endl;\n        } else {\n            cout << \"3-input inference success\" << endl;  // 注意这里修正了原代码的数字错误（5->3）\n        }\n\n        // 释放当前批次的输入内存\n        for (auto data : input_datas) svp_acl_rt_free(data);\n    }\n\n    // 最后释放所有资源\n    sample.DestroyResource();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于samples/contribute/ACT/SVP_NNN/src (https://gitee.com/HiSpark/modelzoo/tree/master/samples/contribute/ACT/SVP_NNN/src)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/contribute/ACT/SVP_NNN/src/CMakeLists.txt)。",
                "summary": "模型可以通过以下代码生成可执行文件，并开放接口由python调用执行推理，以 SVP_NNN 推理引擎为例。",
                "summaryEn": "C++ quick-start notes for ACT. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "1 x 6；1 x 3 x 240 x 320；1 x 3 x 240 x 320"
            },
            {
                "name": "参数量",
                "value": "87 M"
            },
            {
                "name": "计算量",
                "value": "8.02 GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "37",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "27",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "1.8",
                        "unit": "内存（GB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "ACT.zip",
                "size": "907 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-act/resolve/main/ACT.zip",
                "available": true,
                "localFile": "ACT.zip"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-act",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-act",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-act/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-act/resolve/main/act_distill_fp32_for_mindcmd_simp_release.om",
        "primaryDownloadLabel": "act_distill_fp32_for_mindcmd_simp_release.om",
        "downloads": [
            {
                "title": "act_distill_fp32_for_mindcmd_simp_release.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-act/resolve/main/act_distill_fp32_for_mindcmd_simp_release.om",
                "available": true,
                "source": "om-a16w8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "act_distill_fp32_for_mindcmd_simp_release.om",
                "performance": [
                    {
                        "value": "37",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "27",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "1.8",
                        "unit": "内存（GB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "ACT.zip",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-act/resolve/main/ACT.zip",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "ACT.zip"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具库",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "ip92pbfkp400",
        "name": "CRNN",
        "description": "CRNN是卷积循环网络，本模型是一个基于其的中文 OCR 模型。",
        "descriptionZh": "CRNN是卷积循环网络，本模型是一个基于其的中文 OCR 模型。",
        "descriptionEn": "CRNN is a computer vision model for OCR. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-02-12 10:58:59",
        "updatedAt": null,
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 SVP_NNN 和 NNN 引擎上模型性能待进一步优化",
        "category": "计算机视觉",
        "tags": [
            "OCR"
        ],
        "image": "assets/images/1719628489359362_CRNN.png",
        "coverImageUrl": "assets/images/1719628489359362_CRNN.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/ocr/CRNN/",
        "licenseUrl": "https://github.com/meijieru/crnn.pytorch/blob/master/LICENSE.md",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/ocr/CRNN/",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "CRNN模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // CRNN模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::CRNN) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考 文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/ocr/CRNN/src/CMakeLists.txt)",
                "summary": "CRNN模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for CRNN. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "32x160"
            },
            {
                "name": "参数量",
                "value": "11.765M"
            },
            {
                "name": "计算量",
                "value": "2.550GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "12.31",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "81.26",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "124.114",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "184.258",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "100.6",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "9.94",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "477.985",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "100.082",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "mixed_second_finetune_acc_97P7.pth",
                "size": "44.9 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crnn/resolve/main/mixed_second_finetune_acc_97P7.pth",
                "available": true,
                "localFile": "mixed_second_finetune_acc_97P7.pth"
            },
            {
                "name": "crnn.onnx",
                "size": "44.9 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crnn/resolve/main/crnn.onnx",
                "available": true,
                "localFile": "crnn.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-crnn",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crnn",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crnn/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crnn/resolve/main/crnn.om",
        "primaryDownloadLabel": "crnn.om",
        "downloads": [
            {
                "title": "crnn.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crnn/resolve/main/crnn.om",
                "available": true,
                "source": "om-a8w8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "crnn.om",
                "performance": [
                    {
                        "value": "12.31",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "81.26",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "124.114",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "184.258",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "crnn_fp16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crnn/resolve/main/crnn_fp16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-fp16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "crnn_fp16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "100.6",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "9.94",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "477.985",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "100.082",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "mixed_second_finetune_acc_97P7.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crnn/resolve/main/mixed_second_finetune_acc_97P7.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "mixed_second_finetune_acc_97P7.pth"
            },
            {
                "title": "crnn.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crnn/resolve/main/crnn.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "crnn.onnx"
            },
            {
                "title": "CANN配置",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具库",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "iodtp8ht0400",
        "name": "GraspNet",
        "description": "GraspNet是一种基于点云输入的多阶段抓取姿态预测模型，由抓取视角估计和抓取姿态生成两个阶段组成，通过特征提取、视角估计、局部特征提取、抓取参数估计和预测解码一系列处理，最终生成包含抓取评分、抓取宽度、抓取高度、抓取深度、旋转矩阵、抓取中心点和物体ID的预测结果，旨在解决机器人抓取任务中的6D抓取姿态估计问题。",
        "descriptionZh": "GraspNet是一种基于点云输入的多阶段抓取姿态预测模型，由抓取视角估计和抓取姿态生成两个阶段组成，通过特征提取、视角估计、局部特征提取、抓取参数估计和预测解码一系列处理，最终生成包含抓取评分、抓取宽度、抓取高度、抓取深度、旋转矩阵、抓取中心点和物体ID的预测结果，旨在解决机器人抓取任务中的6D抓取姿态估计问题。",
        "descriptionEn": "GraspNet is a computer vision model for embodied AI. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenEuler. Compute targets: Hi3591PV100. The mirror currently exposes 2 downloadable artifacts, along with quick-start resources when available.",
        "date": "2026-02-09 19:42:15",
        "updatedAt": "2026-02-12 11:24:22",
        "badge": "Beta",
        "betaVersionDesc": "该模型跟随Hi3591P配套版本正式发布",
        "category": "计算机视觉",
        "tags": [
            "具身智能"
        ],
        "image": "assets/images/1726646426140674_graspnet_16_9.jpg",
        "coverImageUrl": "assets/images/1726646426140674_graspnet_16_9.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenEuler"
        ],
        "computingPower": [
            "Hi3591PV100"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/embodied_intelligence/GraspNet/README.md",
        "licenseUrl": "https://github.com/graspnet/graspnet-baseline/blob/main/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/embodied_intelligence/GraspNet",
        "quickStartMarkdownUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/embodied_intelligence/GraspNet/README.md",
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n    std::string filePath= \"/path/to/file_list_1.json\"; // 输入文本文件路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::GraspNet) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(filePath, FileType::JsonFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/embodied_intelligence/GraspNet/src/CMakeLists.txt)。",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for GraspNet. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "计算量",
                "value": "71.121GFLOPs"
            },
            {
                "name": "输入",
                "value": "720x1280"
            },
            {
                "name": "参数量",
                "value": "2.397M"
            }
        ],
        "performance": [
            {
                "engine": "Hi3591PV100",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "1337.75",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "0.75",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "2842.42",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "graspnet[该模型文件仅用于非商用].onnx",
                "size": "4.7 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-graspnet/resolve/main/graspnet%5B%E8%AF%A5%E6%A8%A1%E5%9E%8B%E6%96%87%E4%BB%B6%E4%BB%85%E7%94%A8%E4%BA%8E%E9%9D%9E%E5%95%86%E7%94%A8%5D.onnx",
                "available": true,
                "localFile": "graspnet[该模型文件仅用于非商用].onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-graspnet",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-graspnet",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-graspnet/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-graspnet/resolve/main/graspnet_linux_aarch64%5B%E8%AF%A5%E6%A8%A1%E5%9E%8B%E6%96%87%E4%BB%B6%E4%BB%85%E7%94%A8%E4%BA%8E%E9%9D%9E%E5%95%86%E7%94%A8%5D.om",
        "primaryDownloadLabel": "graspnet_linux_aarch64[该模型文件仅用于非商用].om",
        "downloads": [
            {
                "title": "graspnet_linux_aarch64[该模型文件仅用于非商用].om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-graspnet/resolve/main/graspnet_linux_aarch64%5B%E8%AF%A5%E6%A8%A1%E5%9E%8B%E6%96%87%E4%BB%B6%E4%BB%85%E7%94%A8%E4%BA%8E%E9%9D%9E%E5%95%86%E7%94%A8%5D.om",
                "available": true,
                "source": "om-fp16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3591PV100",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "graspnet_linux_aarch64[该模型文件仅用于非商用].om",
                "performance": [
                    {
                        "value": "1337.75",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "0.75",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "2842.42",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "graspnet[该模型文件仅用于非商用].onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-graspnet/resolve/main/graspnet%5B%E8%AF%A5%E6%A8%A1%E5%9E%8B%E6%96%87%E4%BB%B6%E4%BB%85%E7%94%A8%E4%BA%8E%E9%9D%9E%E5%95%86%E7%94%A8%5D.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "graspnet[该模型文件仅用于非商用].onnx"
            }
        ]
    },
    {
        "id": "ib6scq68vs00",
        "name": "CodeFormer",
        "description": "CodeFormer 是一种基于码本查找 Transformer 的鲁棒盲人脸修复模型。相比传统方法，它通过生成对抗网络与量化编码技术，能有效处理模糊、噪声等多种退化问题，兼顾人脸修复质量与身份保真度，适用于盲人脸恢复场景。",
        "descriptionZh": "CodeFormer 是一种基于码本查找 Transformer 的鲁棒盲人脸修复模型。相比传统方法，它通过生成对抗网络与量化编码技术，能有效处理模糊、噪声等多种退化问题，兼顾人脸修复质量与身份保真度，适用于盲人脸恢复场景。",
        "descriptionEn": "CodeFormer is a computer vision model for image enhancement. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 4 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-12-30 17:56:29",
        "updatedAt": "2025-12-30 20:02:18",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "图像增强"
        ],
        "image": "assets/images/1720510897520642_codeformer.jpg",
        "coverImageUrl": "assets/images/1720510897520642_codeformer.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/super_resolution/CodeFormer/",
        "licenseUrl": "https://github.com/sczhou/CodeFormer/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/super_resolution/CodeFormer/",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "CodeFormer模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // CodeFormer模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::CodeFormer) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/super_resolution/CodeFormer/src/CMakeLists.txt)",
                "summary": "CodeFormer模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for CodeFormer. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "512x512"
            },
            {
                "name": "参数量",
                "value": "94.375M"
            },
            {
                "name": "计算量",
                "value": "835.584GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "468.72",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "2.13",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "2356.851",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "264.789",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "1724.14",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "0.58",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "19676.725",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "877.707",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "空文件，因为该模型仅用于非商用.onnx",
                "size": "3 B",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-codeformer/resolve/main/%E7%A9%BA%E6%96%87%E4%BB%B6%EF%BC%8C%E5%9B%A0%E4%B8%BA%E8%AF%A5%E6%A8%A1%E5%9E%8B%E4%BB%85%E7%94%A8%E4%BA%8E%E9%9D%9E%E5%95%86%E7%94%A8.onnx",
                "available": true,
                "localFile": "空文件，因为该模型仅用于非商用.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-codeformer",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-codeformer",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-codeformer/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-codeformer/resolve/main/%E7%A9%BA%E6%96%87%E4%BB%B6%EF%BC%8C%E5%9B%A0%E4%B8%BA%E8%AF%A5%E6%A8%A1%E5%9E%8B%E4%BB%85%E7%94%A8%E4%BA%8E%E9%9D%9E%E5%95%86%E7%94%A8.onnx",
        "primaryDownloadLabel": "空文件，因为该模型仅用于非商用.onnx",
        "downloads": [
            {
                "title": "空文件，因为该模型仅用于非商用.om",
                "href": null,
                "available": false,
                "source": "om-a16w8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": null,
                "performance": [
                    {
                        "value": "468.72",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "2.13",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "2356.851",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "264.789",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "空文件，因为该模型仅用于非商用_FP16_Hi3403V100-NNN.om",
                "href": null,
                "available": false,
                "source": "om-fp16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": null,
                "performance": [
                    {
                        "value": "1724.14",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "0.58",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "19676.725",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "877.707",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "空文件，因为该模型仅用于非商用.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-codeformer/resolve/main/%E7%A9%BA%E6%96%87%E4%BB%B6%EF%BC%8C%E5%9B%A0%E4%B8%BA%E8%AF%A5%E6%A8%A1%E5%9E%8B%E4%BB%85%E7%94%A8%E4%BA%8E%E9%9D%9E%E5%95%86%E7%94%A8.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "空文件，因为该模型仅用于非商用.onnx"
            },
            {
                "title": "CANN配置",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具库",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "iapedo790s00",
        "name": "FaceNet",
        "description": "FaceNet 是一种基于深度卷积神经网络的端到端人脸识别与特征嵌入模型。相比传统基于手工特征或分阶段匹配的方法，它通过将人脸图像直接映射为固定维度的紧凑特征向量（Embedding），并采用三元组损失（Triplet Loss）优化特征相似度度量，能有效缩小类内差异、扩大类间距离，兼顾识别精度与推理效率，适用于身份验证、人脸检索、监控安防等大规模人脸识别场景。",
        "descriptionZh": "FaceNet 是一种基于深度卷积神经网络的端到端人脸识别与特征嵌入模型。相比传统基于手工特征或分阶段匹配的方法，它通过将人脸图像直接映射为固定维度的紧凑特征向量（Embedding），并采用三元组损失（Triplet Loss）优化特征相似度度量，能有效缩小类内差异、扩大类间距离，兼顾识别精度与推理效率，适用于身份验证、人脸检索、监控安防等大规模人脸识别场景。",
        "descriptionEn": "FaceNet is a computer vision model for face recognition. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 6 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-12-29 10:37:55",
        "updatedAt": "2025-12-30 20:02:17",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "人脸识别"
        ],
        "image": "assets/images/1720278245769217_facenet1.jpg",
        "coverImageUrl": "assets/images/1720278245769217_facenet1.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/recognition/FaceNet",
        "licenseUrl": "https://github.com/timesler/facenet-pytorch/blob/master/LICENSE.md",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/recognition/FaceNet",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::FaceNet) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/recognition/FaceNet/src/CMakeLists.txt)。",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for FaceNet. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "160 x 160"
            },
            {
                "name": "参数量",
                "value": "23.469M"
            },
            {
                "name": "计算量",
                "value": "2.854GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "4.07",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "245.73",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "34.671",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "26.344",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "F16",
                "metrics": [
                    {
                        "value": "6.27",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "159.41",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "70.628",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "143.895",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "facenet_vggface2_static.onnx",
                "size": "89.6 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-facenet/resolve/main/facenet_vggface2_static.onnx",
                "available": true,
                "localFile": "facenet_vggface2_static.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-facenet",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-facenet",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-facenet/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-facenet/resolve/main/facenet_vggface2_dpico.om",
        "primaryDownloadLabel": "facenet_vggface2_dpico.om",
        "downloads": [
            {
                "title": "facenet_vggface2_dpico.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-facenet/resolve/main/facenet_vggface2_dpico.om",
                "available": true,
                "source": "om-a16w8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "facenet_vggface2_dpico.om",
                "performance": [
                    {
                        "value": "4.07",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "245.73",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "34.671",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "26.344",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "facenet_vggface2_dlite_fp16.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-facenet/resolve/main/facenet_vggface2_dlite_fp16.om",
                "available": true,
                "source": "om-f16",
                "sourceLabel": "F16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "F16",
                "note": "F16",
                "localFile": "facenet_vggface2_dlite_fp16.om",
                "performance": [
                    {
                        "value": "6.27",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "159.41",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "70.628",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "143.895",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "facenet_vggface2_static.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-facenet/resolve/main/facenet_vggface2_static.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "facenet_vggface2_static.onnx"
            },
            {
                "title": "CANN配置",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具库",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "lfw.tgz",
                "href": null,
                "available": false,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "i9urm5td6k00",
        "name": "LRStereo-B",
        "description": "LRStereo-B是一个轻量且鲁棒的双目立体匹配模型。它在开源模型(Raft-Stereo)的基础上做了大量的模型结构改进和重训。具体功能为输入标定好的左右目图像以及相关的相机参数，获得左目图像对应的深度图。",
        "descriptionZh": "LRStereo-B是一个轻量且鲁棒的双目立体匹配模型。它在开源模型(Raft-Stereo)的基础上做了大量的模型结构改进和重训。具体功能为输入标定好的左右目图像以及相关的相机参数，获得左目图像对应的深度图。",
        "descriptionEn": "LRStereo-B is a computer vision model for stereo depth. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN. The mirror currently exposes 5 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-12-26 20:41:00",
        "updatedAt": "2025-12-30 20:02:17",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "双目深度"
        ],
        "image": "assets/images/1719806466260993_depth.jpg",
        "coverImageUrl": "assets/images/1719806466260993_depth.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/depth/LRStereo-B",
        "licenseUrl": "https://github.com/princeton-vl/RAFT-Stereo/blob/main/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/depth/LRStereo-B",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n  EnvInit();\n  std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n  std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n  std::string omModelDisPath = \"/path/to/model.om\"; // 视差转距离模型文件路径 \n  bool type = std::stoi(cfg[\"type\"]) == 1; // 是否使用视差转距离模型\n  std::unique_ptr<Model> modelStereo = std::make_unique<Model>();\n  modelStereo->Load(omModelPath, LRStereo)\n  std::unique_ptr<Model> modelDis = std::make_unique<Model>();\n  if (type && modelDis->Load(dis_path, LRStereoDis) != 0) {\n    LOG(ERROR) << \"fail to load Dis model\";\n    return 0;\n  }\n  std::vector<std::vector<std::string>> fileLists = ParseFileList(imagePath);\n  std::vector<std::vector<Tensor>> ret;\n  std::vector<Tensor> result;\n  for (size_t i = 0; i < fileLists.size(); ++i) {\n    std::string inputString = BuildInputString(fileLists[i]);\n    ret = modelStereo->Infer(inputString, FileType::SingelImageFile);\n    if (type) {\n      result = modelDis->Infer(ret[0], inputString);\n    }\n  }\n  ret.clear();\n  ret.shrink_to_fit();\n  modelStereo->Unload()\n  if (type) {\n    result.clear();\n    result.shrink_to_fit();\n    modelDis->Unload() != 0\n  }\n  EnvDeinit();\n  return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于[/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)]目录下，编译相关配置参考[CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/depth/LiteAndRobustStereo/src/CMakeLists.txt)]",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for LRStereo-B. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "384x1248"
            },
            {
                "name": "参数量",
                "value": "2.99M"
            },
            {
                "name": "计算量",
                "value": "28.64GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "43.46",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "23.01",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "226.649",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "29.395",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "LRStereo-B.zip",
                "size": "9.3 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-lrstereo-b/resolve/main/LRStereo-B.zip",
                "available": true,
                "localFile": "LRStereo-B.zip"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-lrstereo-b",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-lrstereo-b",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-lrstereo-b/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-lrstereo-b/resolve/main/LRStereo-B_480x640_release.om",
        "primaryDownloadLabel": "LRStereo-B_480x640_release.om",
        "downloads": [
            {
                "title": "LRStereo-B_480x640_release.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-lrstereo-b/resolve/main/LRStereo-B_480x640_release.om",
                "available": true,
                "source": "om-a8w8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "LRStereo-B_480x640_release.om",
                "performance": [
                    {
                        "value": "43.46",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "23.01",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "226.649",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "29.395",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "LRStereo-B.zip",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-lrstereo-b/resolve/main/LRStereo-B.zip",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "LRStereo-B.zip"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "i9t0hkf56k00",
        "name": "YOLOv8s-OBB",
        "description": "YOLOv8s-OBB 是 Ultralytics 推出的基于 YOLOv8 的旋转目标检测（Oriented Bounding Box, OBB）模型。相比于水平框检测，OBB 能够更准确地检测倾斜或不规则排列的目标（如航拍图像中的车辆、船只等）。该模型在 DOTA 数据集上进行了训练和验证。",
        "descriptionZh": "YOLOv8s-OBB 是 Ultralytics 推出的基于 YOLOv8 的旋转目标检测（Oriented Bounding Box, OBB）模型。相比于水平框检测，OBB 能够更准确地检测倾斜或不规则排列的目标（如航拍图像中的车辆、船只等）。该模型在 DOTA 数据集上进行了训练和验证。",
        "descriptionEn": "YOLOv8s-OBB is a computer vision model for object detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-12-26 16:22:36",
        "updatedAt": "2025-12-30 20:02:17",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "assets/images/1719773337550850______20251226161015.jpg",
        "coverImageUrl": "assets/images/1719773337550850______20251226161015.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov8s-obb",
        "licenseUrl": "https://github.com/ultralytics/ultralytics/blob/main/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov8s-obb",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\nusing namespace Infer;\nint main()\n{\n  EnvInit();\n  std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n  std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n  std::unique_ptr<Model> model = std::make_unique<Model>();\n  if (model->Load(omModelPath, ModelType::Yolov8sObb) != 0) {\n    LOG(ERROR) << \"fail to load model\";\n    return -1;\n  }\n  auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n  if (ret.size() == 0) {\n    LOG(ERROR) << \"fail to infer model\";\n    model->Unload();\n    return -1;\n  }\n  if (model->Unload() != 0) {\n    LOG(ERROR) << \"fail to unload model\";\n    return -1;\n  }\n  EnvDeinit();\n  return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于[/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)]目录下，编译相关配置参考[CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov8s-obb/src/CMakeLists.txt)]",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for YOLOv8s-OBB. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "1024x1024"
            },
            {
                "name": "参数量",
                "value": "11.482M"
            },
            {
                "name": "计算量",
                "value": "80.204GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "53.05",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "18.85",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "333.576",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "68.492",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "F16",
                "metrics": [
                    {
                        "value": "274.40",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "3.65",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "943.954",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "165.102",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "yolov8s-obb.onnx",
                "size": "43.9 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-obb/resolve/main/yolov8s-obb.onnx",
                "available": true,
                "localFile": "yolov8s-obb.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolov8s-obb",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-obb",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-obb/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-obb/resolve/main/yolov8s-obb.om",
        "primaryDownloadLabel": "yolov8s-obb.om",
        "downloads": [
            {
                "title": "yolov8s-obb.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-obb/resolve/main/yolov8s-obb.om",
                "available": true,
                "source": "om-a16w8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "yolov8s-obb.om",
                "performance": [
                    {
                        "value": "53.05",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "18.85",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "333.576",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "68.492",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov8s_obb.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-obb/resolve/main/yolov8s_obb.om",
                "available": true,
                "source": "om-f16",
                "sourceLabel": "F16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "F16",
                "note": "F16",
                "localFile": "yolov8s_obb.om",
                "performance": [
                    {
                        "value": "274.40",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "3.65",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "943.954",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "165.102",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov8s-obb.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-obb/resolve/main/yolov8s-obb.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov8s-obb.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "DOTAv1.zip",
                "href": "https://github.com/ultralytics/assets/releases/download/v0.0.0/DOTAv1.zip",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "i9qdl2hh6k00",
        "name": "HRNet",
        "description": "HigherHRNet 是一种新型的自下而上人体姿态估计算法，它在训练阶段引入多分辨率监督机制，在推理阶段采用多分辨率聚合策略，不仅能有效应对自下而上多人姿态估计任务中的尺度变化难题，还可实现关键点的高精度定位，尤其在小尺寸人体目标的处理上表现突出。",
        "descriptionZh": "HigherHRNet 是一种新型的自下而上人体姿态估计算法，它在训练阶段引入多分辨率监督机制，在推理阶段采用多分辨率聚合策略，不仅能有效应对自下而上多人姿态估计任务中的尺度变化难题，还可实现关键点的高精度定位，尤其在小尺寸人体目标的处理上表现突出。",
        "descriptionEn": "HRNet is a computer vision model for pose estimation. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-12-26 10:20:26",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "姿态估计"
        ],
        "image": "assets/images/1719728246685699_result_valid_0.jpg",
        "coverImageUrl": "assets/images/1719728246685699_result_valid_0.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/pose/HRNet",
        "licenseUrl": "https://github.com/HRNet/HigherHRNet-Human-Pose-Estimation/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/pose/HRNet",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "HRNet模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // HRNet模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::HRNet) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common) 目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/pose/HRNet/src/CMakeLists.txt) 。",
                "summary": "HRNet模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for HRNet. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "512x768"
            },
            {
                "name": "参数量",
                "value": "28.618M"
            },
            {
                "name": "计算量",
                "value": "70.645GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "72.28",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "13.84",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "323.933",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "82.879",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "181.16",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "5.52",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "1278.445",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "307.164",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "pose_higher_hrnet_w32_512.pth",
                "size": "110 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-hrnet/resolve/main/pose_higher_hrnet_w32_512.pth",
                "available": true,
                "localFile": "pose_higher_hrnet_w32_512.pth"
            },
            {
                "name": "hrnet_512_768.onnx",
                "size": "112 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-hrnet/resolve/main/hrnet_512_768.onnx",
                "available": true,
                "localFile": "hrnet_512_768.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-hrnet",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-hrnet",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-hrnet/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-hrnet/resolve/main/hrnet_512_768.om",
        "primaryDownloadLabel": "hrnet_512_768.om",
        "downloads": [
            {
                "title": "hrnet_512_768.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-hrnet/resolve/main/hrnet_512_768.om",
                "available": true,
                "source": "om-a16w8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "hrnet_512_768.om",
                "performance": [
                    {
                        "value": "72.28",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "13.84",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "323.933",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "82.879",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "hrnet_512_768_fp16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-hrnet/resolve/main/hrnet_512_768_fp16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-fp16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "hrnet_512_768_fp16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "181.16",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "5.52",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "1278.445",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "307.164",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "pose_higher_hrnet_w32_512.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-hrnet/resolve/main/pose_higher_hrnet_w32_512.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "pose_higher_hrnet_w32_512.pth"
            },
            {
                "title": "hrnet_512_768.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-hrnet/resolve/main/hrnet_512_768.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "hrnet_512_768.onnx"
            },
            {
                "title": "CANN配置",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具库",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "i9q7jrn16k00",
        "name": "YOLO11s",
        "description": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLO11网络模型是YOLO系列的最新版本，在继承了原有YOLO网络模型优点的基础上，在架构和训练方法上进行了重大改进，具有更高的检测精度、速度和效率",
        "descriptionZh": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLO11网络模型是YOLO系列的最新版本，在继承了原有YOLO网络模型优点的基础上，在架构和训练方法上进行了重大改进，具有更高的检测精度、速度和效率",
        "descriptionEn": "YOLO11s is a computer vision model for object detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-12-26 09:54:03",
        "updatedAt": "2025-12-30 20:02:18",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "assets/images/1701337666486274_yolo11s.jpg",
        "coverImageUrl": "assets/images/1701337666486274_yolo11s.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/Hispark/modelzoo/tree/master/samples/samples_GPL/built-in/yolo11s",
        "licenseUrl": "https://github.com/ultralytics/ultralytics/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/Hispark/modelzoo/tree/master/samples/samples_GPL/built-in/yolo11s",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main(int argc, char *argv[])\n{\n    InferParam inferParam;\n    ParseCmd(argc, argv, inferParam)\n    DevInit(inferParam.aclConfigPath);\n    ModelInfer(inferParam);\n    Infer::DevDeInit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolo11s/src/CMakeLists.txt)",
                "summary": "模型可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme",
                "summaryEn": "C++ quick-start notes for YOLO11s. Covers runtime initialization, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "640x640"
            },
            {
                "name": "参数量",
                "value": "9.469M"
            },
            {
                "name": "计算量",
                "value": "23.805GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "23.471",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "42.607",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "153.643",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "37.102",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "43.430",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "23.020",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "342.670",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "112.672",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "yolo11s.pt",
                "size": "18.4 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s/resolve/main/yolo11s.pt",
                "available": true,
                "localFile": "yolo11s.pt"
            },
            {
                "name": "yolo11s.onnx",
                "size": "36.2 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s/resolve/main/yolo11s.onnx",
                "available": true,
                "localFile": "yolo11s.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolo11s",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s/resolve/main/yolo11s.om",
        "primaryDownloadLabel": "yolo11s.om",
        "downloads": [
            {
                "title": "yolo11s.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s/resolve/main/yolo11s.om",
                "available": true,
                "source": "om-a16w8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "yolo11s.om",
                "performance": [
                    {
                        "value": "23.471",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "42.607",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "153.643",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "37.102",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolo11s_fp16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s/resolve/main/yolo11s_fp16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-fp16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "yolo11s_fp16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "43.430",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "23.020",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "342.670",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "112.672",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolo11s.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s/resolve/main/yolo11s.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolo11s.pt"
            },
            {
                "title": "yolo11s.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s/resolve/main/yolo11s.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolo11s.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "i9q65e4hec00",
        "name": "YOLOv8s",
        "description": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLOv8在之前的YOLO版本的基础上进行了改进，在继承了原有YOLO网络模型优点的基础上，引入了新的特效和优化，具有更高的检测精度。",
        "descriptionZh": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLOv8在之前的YOLO版本的基础上进行了改进，在继承了原有YOLO网络模型优点的基础上，引入了新的特效和优化，具有更高的检测精度。",
        "descriptionEn": "YOLOv8s is a computer vision model for object detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-12-26 09:47:43",
        "updatedAt": "2025-12-30 20:02:17",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "assets/images/1701430205546498_yolov8s.jpg",
        "coverImageUrl": "assets/images/1701430205546498_yolov8s.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/Hispark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov8s",
        "licenseUrl": "https://github.com/ultralytics/ultralytics/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/Hispark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov8s",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型 可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main(int argc, char *argv[])\n{\n    InferParam inferParam;\n    ParseCmd(argc, argv, inferParam)\n    DevInit(inferParam.aclConfigPath);\n    ModelInfer(inferParam);\n    Infer::DevDeInit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov8s/src/CMakeLists.txt)",
                "summary": "模型 可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme",
                "summaryEn": "C++ quick-start notes for YOLOv8s. Covers runtime initialization, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "640x640"
            },
            {
                "name": "参数量",
                "value": "11.182M"
            },
            {
                "name": "计算量",
                "value": "30.486GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "23.461",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "42.624",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "132.421",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "34.344",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "39.060",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "26.220",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "298.243",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "115.578",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "yolov8s.pt",
                "size": "21.5 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s/resolve/main/yolov8s.pt",
                "available": true,
                "localFile": "yolov8s.pt"
            },
            {
                "name": "yolov8s.onnx",
                "size": "42.7 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s/resolve/main/yolov8s.onnx",
                "available": true,
                "localFile": "yolov8s.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolov8s",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s/resolve/main/yolov8s.om",
        "primaryDownloadLabel": "yolov8s.om",
        "downloads": [
            {
                "title": "yolov8s.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s/resolve/main/yolov8s.om",
                "available": true,
                "source": "om-a16w8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "yolov8s.om",
                "performance": [
                    {
                        "value": "23.461",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "42.624",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "132.421",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "34.344",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov8s_fp16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s/resolve/main/yolov8s_fp16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-fp16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "yolov8s_fp16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "39.060",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "26.220",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "298.243",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "115.578",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov8s.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s/resolve/main/yolov8s.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov8s.pt"
            },
            {
                "title": "yolov8s.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s/resolve/main/yolov8s.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov8s.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "i9kll1a96k00",
        "name": "VDSR",
        "description": "VDSR（Very Deep Super-Resolution Network）是一种20层深度卷积神经网络，通过残差学习实现图像超分辨率重建。",
        "descriptionZh": "VDSR（Very Deep Super-Resolution Network）是一种20层深度卷积神经网络，通过残差学习实现图像超分辨率重建。",
        "descriptionEn": "VDSR is a computer vision model for image super-resolution. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 6 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-12-25 20:56:31",
        "updatedAt": "2025-12-30 20:02:18",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "图像超分"
        ],
        "image": "assets/images/1719627344314369_VDSRdemo.png",
        "coverImageUrl": "assets/images/1719627344314369_VDSRdemo.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/super_resolution/VDSR",
        "licenseUrl": "https://github.com/Lornatang/VDSR-PyTorch/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/super_resolution/VDSR",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "VDSR模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // VDSR模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::VDSR) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/super_resolution/VDSR/src/CMakeLists.txt)",
                "summary": "VDSR模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for VDSR. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "516x516"
            },
            {
                "name": "参数量",
                "value": "664.704M"
            },
            {
                "name": "计算量",
                "value": "354.611GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "66.28",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "15.09",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "38.72",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "22.332",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "228.43",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "4.38",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "1714.531",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "120.004",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "vdsr.zip",
                "size": "4.8 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vdsr/resolve/main/vdsr.zip",
                "available": true,
                "localFile": "vdsr.zip"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-vdsr",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vdsr",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vdsr/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vdsr/resolve/main/vdsr.om",
        "primaryDownloadLabel": "vdsr.om",
        "downloads": [
            {
                "title": "vdsr.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vdsr/resolve/main/vdsr.om",
                "available": true,
                "source": "om-a8w8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "vdsr.om",
                "performance": [
                    {
                        "value": "66.28",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "15.09",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "38.72",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "22.332",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "vdsr_fp16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vdsr/resolve/main/vdsr_fp16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-fp16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "vdsr_fp16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "228.43",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "4.38",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "1714.531",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "120.004",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "vdsr.zip",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vdsr/resolve/main/vdsr.zip",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "vdsr.zip"
            },
            {
                "title": "CANN配置",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具库",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "i9kei1td6k00",
        "name": "Siamese Network",
        "description": "Siamese Network(孪生神经网络)是一种通过共享权重的两个相同子网络来度量两个输入样本相似性的深度学习框架，广泛应用于人脸识别、签名验证等任务。",
        "descriptionZh": "Siamese Network(孪生神经网络)是一种通过共享权重的两个相同子网络来度量两个输入样本相似性的深度学习框架，广泛应用于人脸识别、签名验证等任务。",
        "descriptionEn": "Siamese Network is a computer vision model for face recognition. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 6 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-12-25 20:25:32",
        "updatedAt": null,
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 SVP_NNN 和 NNN 引擎上模型性能待进一步优化",
        "category": "计算机视觉",
        "tags": [
            "人脸识别"
        ],
        "image": "assets/images/1719623508623362_SiameseNetwork.png",
        "coverImageUrl": "assets/images/1719623508623362_SiameseNetwork.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/recognition/SiameseNetwork/doc/%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B.md",
        "licenseUrl": "https://github.com/harveyslash/Facial-Similarity-with-Siamese-Networks-in-Pytorch/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/recognition/SiameseNetwork",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // SiameseNetwork模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::SiameseNetwork) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/recognition/SiameseNetwork/src/CMakeLists.txt)",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for Siamese Network. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "100x100"
            },
            {
                "name": "参数量",
                "value": "40254.505M"
            },
            {
                "name": "计算量",
                "value": "0.223GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "4.6",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "217.44",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "77.754",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "98.895",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "28.81",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "34.71",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "377.84",
                        "unit": "带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "197.715",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "siamese_model_weights.pt",
                "size": "154 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-siamese-network/resolve/main/siamese_model_weights.pt",
                "available": true,
                "localFile": "siamese_model_weights.pt"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-siamese-network",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-siamese-network",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-siamese-network/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-siamese-network/resolve/main/siamese_network.om",
        "primaryDownloadLabel": "siamese_network.om",
        "downloads": [
            {
                "title": "siamese_network.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-siamese-network/resolve/main/siamese_network.om",
                "available": true,
                "source": "om-a8w8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "siamese_network.om",
                "performance": [
                    {
                        "value": "4.6",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "217.44",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "77.754",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "98.895",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "siamese_network_fp16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-siamese-network/resolve/main/siamese_network_fp16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-fp16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "siamese_network_fp16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "28.81",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "34.71",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "377.84",
                        "unit": "带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "197.715",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "siamese_model_weights.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-siamese-network/resolve/main/siamese_model_weights.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "siamese_model_weights.pt"
            },
            {
                "title": "CANN配置",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具库",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "i9j5c2fl6k00",
        "name": "YOLO11s-seg",
        "description": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLO11网络模型是YOLO系列的最新版本，在继承了原有YOLO网络模型优点的基础上，在架构和训练方法上进行了重大改进，具有更高的检测精度、速度和效率。YOLO11s-seg作为实例分割的模型，比检测模型更进一步，包括识别图像中的各个对象并将它们与图像的其余部分分割开来。",
        "descriptionZh": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLO11网络模型是YOLO系列的最新版本，在继承了原有YOLO网络模型优点的基础上，在架构和训练方法上进行了重大改进，具有更高的检测精度、速度和效率。YOLO11s-seg作为实例分割的模型，比检测模型更进一步，包括识别图像中的各个对象并将它们与图像的其余部分分割开来。",
        "descriptionEn": "YOLO11s-seg is a computer vision model for object detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-12-25 17:25:35",
        "updatedAt": "2025-12-30 20:02:18",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "assets/images/1701430507536385_yolo11s-seg.jpg",
        "coverImageUrl": "assets/images/1701430507536385_yolo11s-seg.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/Hispark/modelzoo/tree/master/samples/samples_GPL/built-in/yolo11s-seg",
        "licenseUrl": "https://github.com/ultralytics/ultralytics/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/Hispark/modelzoo/tree/master/samples/samples_GPL/built-in/yolo11s-seg",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // yolo11s-seg模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::Yolo11s-seg) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolo11s-seg/src/CMakeLists.txt)。",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for YOLO11s-seg. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "640x640"
            },
            {
                "name": "参数量",
                "value": "10.123M"
            },
            {
                "name": "计算量",
                "value": "38.183GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "29.36",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "34.06",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "172.6",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "39.973",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "F16",
                "metrics": [
                    {
                        "value": "55.00",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "18.18",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "420.118",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "130.477",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "yolo11s-seg.pt",
                "size": "19.7 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-seg/resolve/main/yolo11s-seg.pt",
                "available": true,
                "localFile": "yolo11s-seg.pt"
            },
            {
                "name": "yolo11s-seg.onnx",
                "size": "38.7 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-seg/resolve/main/yolo11s-seg.onnx",
                "available": true,
                "localFile": "yolo11s-seg.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolo11s-seg",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-seg",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-seg/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-seg/resolve/main/yolo11s-seg.om",
        "primaryDownloadLabel": "yolo11s-seg.om",
        "downloads": [
            {
                "title": "yolo11s-seg.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-seg/resolve/main/yolo11s-seg.om",
                "available": true,
                "source": "om-a16w8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "yolo11s-seg.om",
                "performance": [
                    {
                        "value": "29.36",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "34.06",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "172.6",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "39.973",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolo11s-seg_dlite_fp16.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-seg/resolve/main/yolo11s-seg_dlite_fp16.om",
                "available": true,
                "source": "om-f16",
                "sourceLabel": "F16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "F16",
                "note": "F16",
                "localFile": "yolo11s-seg_dlite_fp16.om",
                "performance": [
                    {
                        "value": "55.00",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "18.18",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "420.118",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "130.477",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolo11s-seg.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-seg/resolve/main/yolo11s-seg.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolo11s-seg.pt"
            },
            {
                "title": "yolo11s-seg.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-seg/resolve/main/yolo11s-seg.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolo11s-seg.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "i9j2lpl16k00",
        "name": "YOLOv6s",
        "description": "YOLOv6s 是一种轻量高效的 one-stage 目标检测模型。相比前代 YOLO 模型，YOLOv6s 采用了 EfficientRep 作为 backbone 和 Rep-PAN 作为颈部网络，兼顾了检测精度与推理速度，更适用于边缘计算场景。",
        "descriptionZh": "YOLOv6s 是一种轻量高效的 one-stage 目标检测模型。相比前代 YOLO 模型，YOLOv6s 采用了 EfficientRep 作为 backbone 和 Rep-PAN 作为颈部网络，兼顾了检测精度与推理速度，更适用于边缘计算场景。",
        "descriptionEn": "YOLOv6s is a computer vision model for object detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-12-25 17:13:48",
        "updatedAt": "2025-12-30 20:02:18",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "assets/images/1712131718316033_yolov6s.jpg",
        "coverImageUrl": "assets/images/1712131718316033_yolov6s.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov6s",
        "licenseUrl": "https://github.com/meituan/YOLOv6/blob/main/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov6s",
        "quickStartMarkdownUrl": "xxx",
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // yolov6s模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, Infer::Yolov6s) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov6s/src/CMakeLists.txt)。",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for YOLOv6s. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "640x640"
            },
            {
                "name": "参数量",
                "value": "18.571M"
            },
            {
                "name": "计算量",
                "value": "45.588GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "25.31",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "39.51",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "72.083",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "35.957",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "F16",
                "metrics": [
                    {
                        "value": "33.07",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "30.24",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "253.230",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "141.480",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "yolov6s.pt",
                "size": "38.9 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov6s/resolve/main/yolov6s.pt",
                "available": true,
                "localFile": "yolov6s.pt"
            },
            {
                "name": "yolov6s_opset11.onnx",
                "size": "70.9 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov6s/resolve/main/yolov6s_opset11.onnx",
                "available": true,
                "localFile": "yolov6s_opset11.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolov6s",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov6s",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov6s/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov6s/resolve/main/yolov6s_dpico.om",
        "primaryDownloadLabel": "yolov6s_dpico.om",
        "downloads": [
            {
                "title": "yolov6s_dpico.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov6s/resolve/main/yolov6s_dpico.om",
                "available": true,
                "source": "om-a16w8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "yolov6s_dpico.om",
                "performance": [
                    {
                        "value": "25.31",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "39.51",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "72.083",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "35.957",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov6s_dlite_fp16.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov6s/resolve/main/yolov6s_dlite_fp16.om",
                "available": true,
                "source": "om-f16",
                "sourceLabel": "F16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "F16",
                "note": "F16",
                "localFile": "yolov6s_dlite_fp16.om",
                "performance": [
                    {
                        "value": "33.07",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "30.24",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "253.230",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "141.480",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov6s.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov6s/resolve/main/yolov6s.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov6s.pt"
            },
            {
                "title": "yolov6s_opset11.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov6s/resolve/main/yolov6s_opset11.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov6s_opset11.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "i9j1qkj1ec00",
        "name": "PFLD",
        "description": "PFLD全称A Practical Facial Landmark Detector是一个精度高，速度快，模型小的人脸关键点检测模型。",
        "descriptionZh": "PFLD全称A Practical Facial Landmark Detector是一个精度高，速度快，模型小的人脸关键点检测模型。",
        "descriptionEn": "PFLD is a computer vision model for keypoint detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 6 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-12-25 17:10:06",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "关键点检测"
        ],
        "image": "assets/images/1701485360513025_PFLD.png",
        "coverImageUrl": "assets/images/1701485360513025_PFLD.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/detection/PFLD",
        "licenseUrl": "https://github.com/polarisZhao/PFLD-pytorch.git",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/detection/PFLD",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "PFLD模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n     std::string aclConfigPath = \"/path/to/acl.cfg\"; // 输入acl的配置路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    ret = Infer::DevInit(aclConfigPath);\n    std::shared_ptr<Infer::MdlBase> model = Infer::MdlCreate();\n    ret = model->LoadModel(omModelPath);\n    std::vector<std::string> imglists;\n    ret = ReadImglistFile(imagePath, imglists);\n    std::vector<Infer::TensorBuf> inBufs, outBufs;\n    std::vector<Infer::TensorDesc> inDescs, outDescs;\n    Infer::TensorDesc desc;\n    size_t inputNum = model->GetInTensorNum();\n    size_t  outputNum = model->GetOutTensorNum();\n    for (size_t i = 0; i < inputNum; i++) {\n        model->GetInTensorDescByIdx(i, desc);\n        inDescs.push_back(desc);\n        inBufs.emplace_back(desc.defaultSize, desc.defaultStride);\n    }\n    for (size_t i = 0; i < outputNum; i++) {\n        model->GetOutTensorDescByIdx(i, desc);\n        outDescs.push_back(desc);\n        outBufs.emplace_back(desc.defaultSize, desc.defaultStride);\n    }\n    model->GetInTensorDescByIdx(0, desc);\n    for (size_t i = 0; i < imglists.size(); ++i) {\n        ret = ReadImgFileToBuf(imglists[i], desc, inBufs[0]);\n        for (size_t j = 0; j < loop; j++) {\n            ret = model->Execute(inBufs, outBufs);\n        }\n        (void)PostProcess(outBufs, outDescs, imglists[i]);\n    }\n    model->UnLoadModel();\n    Infer::DevDeInit();\n    return 0;\n}\n备注：上述C++代码仅展示了主要流程，详细实现请参考PFLD (https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/detection/PFLD)。",
                "summary": "PFLD模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for PFLD. Covers runtime initialization, inference execution, configuration handling, and build instructions."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "112 x 112"
            },
            {
                "name": "参数量",
                "value": "24.184M"
            },
            {
                "name": "计算量",
                "value": "127.785GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "0.62",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "1624.65",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "5.076",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "4.824",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "F16",
                "metrics": [
                    {
                        "value": "1.63",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "611.95",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "19.859",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "48.227",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "pfld-sim.onnx",
                "size": "4.9 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-pfld/resolve/main/pfld-sim.onnx",
                "available": true,
                "localFile": "pfld-sim.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-pfld",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-pfld",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-pfld/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-pfld/resolve/main/pfld_dpico.om",
        "primaryDownloadLabel": "pfld_dpico.om",
        "downloads": [
            {
                "title": "pfld_dpico.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-pfld/resolve/main/pfld_dpico.om",
                "available": true,
                "source": "om-a16w8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "pfld_dpico.om",
                "performance": [
                    {
                        "value": "0.62",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "1624.65",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "5.076",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "4.824",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "pfld_dlite_fp16.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-pfld/resolve/main/pfld_dlite_fp16.om",
                "available": true,
                "source": "om-f16",
                "sourceLabel": "F16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "F16",
                "note": "F16",
                "localFile": "pfld_dlite_fp16.om",
                "performance": [
                    {
                        "value": "1.63",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "611.95",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "19.859",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "48.227",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "pfld-sim.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-pfld/resolve/main/pfld-sim.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "pfld-sim.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "i9iei09pec00",
        "name": "YOLOv8s-seg",
        "description": "YOLOv8s-seg 是一种轻量高效的 one-stage 实例分割模型。相比前代 YOLO 模型，YOLOv8s-seg 采用 C2f 作为 backbone 和 PAFPN 作为颈部网络，结合 “原型掩码 + 掩码系数” 的分割头设计，在保证实时推理速度的同时实现像素级实例分割，适用于轻量化边缘部署场景。",
        "descriptionZh": "YOLOv8s-seg 是一种轻量高效的 one-stage 实例分割模型。相比前代 YOLO 模型，YOLOv8s-seg 采用 C2f 作为 backbone 和 PAFPN 作为颈部网络，结合 “原型掩码 + 掩码系数” 的分割头设计，在保证实时推理速度的同时实现像素级实例分割，适用于轻量化边缘部署场景。",
        "descriptionEn": "YOLOv8s-seg is a computer vision model for segmentation. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 6 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-12-25 15:45:54",
        "updatedAt": "2025-12-30 21:27:16",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分割"
        ],
        "image": "assets/images/1719623665909762_yolov8s-seg.jpg",
        "coverImageUrl": "assets/images/1719623665909762_yolov8s-seg.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov8s-seg",
        "licenseUrl": "https://github.com/ultralytics/ultralytics/blob/main/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov8s-seg",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::Yolov8sSeg) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov8s-seg/src/CMakeLists.txt)。",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for YOLOv8s-seg. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "640x640"
            },
            {
                "name": "参数量",
                "value": "11.853M"
            },
            {
                "name": "计算量",
                "value": "44.864GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "46.59",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "21.46",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "165.177",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "63.418",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "48.34",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "20.69",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "371.216",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "124.887",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "yolov8s-seg.onnx",
                "size": "45.3 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-seg/resolve/main/yolov8s-seg.onnx",
                "available": true,
                "localFile": "yolov8s-seg.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolov8s-seg",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-seg",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-seg/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-seg/resolve/main/yolov8s-seg_dpico.om",
        "primaryDownloadLabel": "yolov8s-seg_dpico.om",
        "downloads": [
            {
                "title": "yolov8s-seg_dpico.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-seg/resolve/main/yolov8s-seg_dpico.om",
                "available": true,
                "source": "om-a16w8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "yolov8s-seg_dpico.om",
                "performance": [
                    {
                        "value": "46.59",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "21.46",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "165.177",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "63.418",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov8s-seg_dlite_fp16.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-seg/resolve/main/yolov8s-seg_dlite_fp16.om",
                "available": true,
                "source": "om-fp16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "yolov8s-seg_dlite_fp16.om",
                "performance": [
                    {
                        "value": "48.34",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "20.69",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "371.216",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "124.887",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov8s-seg.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-seg/resolve/main/yolov8s-seg.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov8s-seg.onnx"
            },
            {
                "title": "CANN配置",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具库",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "i9i4tr9hec00",
        "name": "CrowdCount",
        "description": "CrowdCount是一种基于多尺度卷积神经网络（MSCNN）的高精度人群计数模型。相比传统多列 / 多网络方法，它通过单列网络中的多尺度特征块（MSB）与尺度自适应密度图回归技术，能有效应对透视畸变导致的人物尺度差异问题，兼顾计数精度与模型轻量化，适用于监控图像、公共场所等密集人群计数场景。",
        "descriptionZh": "CrowdCount是一种基于多尺度卷积神经网络（MSCNN）的高精度人群计数模型。相比传统多列 / 多网络方法，它通过单列网络中的多尺度特征块（MSB）与尺度自适应密度图回归技术，能有效应对透视畸变导致的人物尺度差异问题，兼顾计数精度与模型轻量化，适用于监控图像、公共场所等密集人群计数场景。",
        "descriptionEn": "CrowdCount is a computer vision model for crowd counting. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 6 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-12-25 15:03:50",
        "updatedAt": "2025-12-30 21:27:21",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "人群计数"
        ],
        "image": "assets/images/1719967754027009_combined_plot.jpg",
        "coverImageUrl": "assets/images/1719967754027009_combined_plot.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/count/CrowdCount",
        "licenseUrl": "https://github.com/zzubqh/CrowdCount/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/count/CrowdCount",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::CrowdCount) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/count/CrowdCount/src/CMakeLists.txt)。",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for CrowdCount. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "224x224"
            },
            {
                "name": "参数量",
                "value": "34.738M"
            },
            {
                "name": "计算量",
                "value": "587.807GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "217.01",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "4.61",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "322.604",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "67.703",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "F16",
                "metrics": [
                    {
                        "value": "349.99",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "2.86",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "1677.176",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "243.684",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "mscnn_model.onnx",
                "size": "133 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crowdcount/resolve/main/mscnn_model.onnx",
                "available": true,
                "localFile": "mscnn_model.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-crowdcount",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crowdcount",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crowdcount/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crowdcount/resolve/main/mscnn_model_dpico.om",
        "primaryDownloadLabel": "mscnn_model_dpico.om",
        "downloads": [
            {
                "title": "mscnn_model_dpico.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crowdcount/resolve/main/mscnn_model_dpico.om",
                "available": true,
                "source": "om-a16w8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "mscnn_model_dpico.om",
                "performance": [
                    {
                        "value": "217.01",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "4.61",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "322.604",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "67.703",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "mscnn_model_dlite.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crowdcount/resolve/main/mscnn_model_dlite.om",
                "available": true,
                "source": "om-f16",
                "sourceLabel": "F16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "F16",
                "note": "F16",
                "localFile": "mscnn_model_dlite.om",
                "performance": [
                    {
                        "value": "349.99",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "2.86",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "1677.176",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "243.684",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "mscnn_model.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crowdcount/resolve/main/mscnn_model.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "mscnn_model.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "i16b4pv8rc00",
        "name": "UNet",
        "description": "UNet是由FCN改进而来的图像分割模型，其网络结构像U型，分为特征提取部分和上采样特征融合部分。",
        "descriptionZh": "UNet是由FCN改进而来的图像分割模型，其网络结构像U型，分为特征提取部分和上采样特征融合部分。",
        "descriptionEn": "UNet is a computer vision model for segmentation. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 8 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-11-29 15:01:53",
        "updatedAt": "2025-11-29 18:03:49",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分割"
        ],
        "image": "assets/images/1701484842647555_15_2307569255_huge.jpg",
        "coverImageUrl": "assets/images/1701484842647555_15_2307569255_huge.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/UNet",
        "licenseUrl": "https://github.com/milesial/Pytorch-UNet/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/UNet",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "UNet模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // UNet模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::Unet) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/UNet/src/CMakeLists.txt)。",
                "summary": "UNet模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for UNet. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "572x572"
            },
            {
                "name": "参数量",
                "value": "31.032M"
            },
            {
                "name": "计算量",
                "value": "499.572GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "104.09",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "9.61",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "281.472",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "91.445",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "F16",
                "metrics": [
                    {
                        "value": "467.29",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "2.14",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "3072.86",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "397.098",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "UNet.pth",
                "size": "119 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet/resolve/main/UNet.pth",
                "available": true,
                "localFile": "UNet.pth"
            },
            {
                "name": "UNet_dynamic_bs.onnx",
                "size": "118 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet/resolve/main/UNet_dynamic_bs.onnx",
                "available": true,
                "localFile": "UNet_dynamic_bs.onnx"
            },
            {
                "name": "UNet_dynamic_sim.onnx",
                "size": "118 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet/resolve/main/UNet_dynamic_sim.onnx",
                "available": true,
                "localFile": "UNet_dynamic_sim.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-unet",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet/resolve/main/unet.om",
        "primaryDownloadLabel": "unet.om",
        "downloads": [
            {
                "title": "unet.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet/resolve/main/unet.om",
                "available": true,
                "source": "om-a8w8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "unet.om",
                "performance": [
                    {
                        "value": "104.09",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "9.61",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "281.472",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "91.445",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "unet_f16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet/resolve/main/unet_f16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-f16",
                "sourceLabel": "F16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "F16",
                "note": "F16",
                "localFile": "unet_f16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "467.29",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "2.14",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "3072.86",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "397.098",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "UNet.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet/resolve/main/UNet.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "UNet.pth"
            },
            {
                "title": "UNet_dynamic_bs.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet/resolve/main/UNet_dynamic_bs.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "UNet_dynamic_bs.onnx"
            },
            {
                "title": "UNet_dynamic_sim.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet/resolve/main/UNet_dynamic_sim.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "UNet_dynamic_sim.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/ ",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "ht96f9b50o00",
        "name": "VGG16",
        "description": "VGGNet是牛津大学计算机视觉组（Visual Geometry Group）和Google DeepMind公司的研究员一起研发的深度卷积神经网络，它探索了卷积神经网络的深度与其性能之间的关系，通过反复堆叠3*3的小型卷积核和2*2的最大池化层，成功地构筑了16~19层深的卷积神经网络。VGGNet相比之前state-of-the-art的网络结构，错误率大幅下降，VGGNet论文中全部使用了3*3的小型卷积核和2*2的最大池化核，通过不断加深网络结构来提升性能。",
        "descriptionZh": "VGGNet是牛津大学计算机视觉组（Visual Geometry Group）和Google DeepMind公司的研究员一起研发的深度卷积神经网络，它探索了卷积神经网络的深度与其性能之间的关系，通过反复堆叠3*3的小型卷积核和2*2的最大池化层，成功地构筑了16~19层深的卷积神经网络。VGGNet相比之前state-of-the-art的网络结构，错误率大幅下降，VGGNet论文中全部使用了3*3的小型卷积核和2*2的最大池化核，通过不断加深网络结构来提升性能。",
        "descriptionEn": "VGG16 is a computer vision model for classification. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-11-17 11:25:12",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "assets/images/1712668134146051_panda1.jpg",
        "coverImageUrl": "assets/images/1712668134146051_panda1.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/VGG16",
        "licenseUrl": "https://github.com/pytorch/vision/blob/main/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/VGG16",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "VGG16模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // VGG16模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::VGG16) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/VGG16/src/CMakeLists.txt)。",
                "summary": "VGG16模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for VGG16. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "224x224"
            },
            {
                "name": "参数量",
                "value": "138.358M"
            },
            {
                "name": "计算量",
                "value": "31.007GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "12.88",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "77.65",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "133.486",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "143.195",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "30.74",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "32.53",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "373.265",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "582.809",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "vgg16.onnx",
                "size": "528 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vgg16/resolve/main/vgg16.onnx",
                "available": true,
                "localFile": "vgg16.onnx"
            },
            {
                "name": "vgg16-397923af.pth",
                "size": "528 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vgg16/resolve/main/vgg16-397923af.pth",
                "available": true,
                "localFile": "vgg16-397923af.pth"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-vgg16",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vgg16",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vgg16/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vgg16/resolve/main/vgg16.om",
        "primaryDownloadLabel": "vgg16.om",
        "downloads": [
            {
                "title": "vgg16.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vgg16/resolve/main/vgg16.om",
                "available": true,
                "source": "om-a8w8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "vgg16.om",
                "performance": [
                    {
                        "value": "12.88",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "77.65",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "133.486",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "143.195",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "vgg16_fp16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vgg16/resolve/main/vgg16_fp16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-fp16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "vgg16_fp16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "30.74",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "32.53",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "373.265",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "582.809",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "vgg16.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vgg16/resolve/main/vgg16.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "vgg16.onnx"
            },
            {
                "title": "vgg16-397923af.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vgg16/resolve/main/vgg16-397923af.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "vgg16-397923af.pth"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/ ",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "hsd646tl0o00",
        "name": "InceptionV3",
        "description": "InceptionV3 是为图像分类任务设计的高效卷积神经网络，其核心创新是使用模块化的 Inception 结构（如分解卷积、辅助分类器）来在保持计算效率的同时提升特征提取能力，并在 ImageNet 等数据集上取得优异性能。",
        "descriptionZh": "InceptionV3 是为图像分类任务设计的高效卷积神经网络，其核心创新是使用模块化的 Inception 结构（如分解卷积、辅助分类器）来在保持计算效率的同时提升特征提取能力，并在 ImageNet 等数据集上取得优异性能。",
        "descriptionEn": "InceptionV3 is a computer vision model for classification. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-11-14 18:09:00",
        "updatedAt": "2025-11-29 14:49:57",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "assets/images/1712176979116033_InceptionV3.png",
        "coverImageUrl": "assets/images/1712176979116033_InceptionV3.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/InceptionV3",
        "licenseUrl": "https://github.com/pytorch/vision/blob/v0.14.0/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/InceptionV3",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // InceptionV3模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::InceptionV3) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/InceptionV3/src/CMakeLists.txt)",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for InceptionV3. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "299x299"
            },
            {
                "name": "参数量",
                "value": "23.817M"
            },
            {
                "name": "计算量",
                "value": "11.511GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "5.15",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "194.26",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "30.555",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "28.0",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "10.398",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "95.48",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "131.305",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "153.855",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "InceptionV3.onnx",
                "size": "90.9 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-inceptionv3/resolve/main/InceptionV3.onnx",
                "available": true,
                "localFile": "InceptionV3.onnx"
            },
            {
                "name": "Inceptionv3.zip",
                "size": "96.3 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-inceptionv3/resolve/main/Inceptionv3.zip",
                "available": true,
                "localFile": "Inceptionv3.zip"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-inceptionv3",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-inceptionv3",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-inceptionv3/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-inceptionv3/resolve/main/InceptionV3.om",
        "primaryDownloadLabel": "InceptionV3.om",
        "downloads": [
            {
                "title": "InceptionV3.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-inceptionv3/resolve/main/InceptionV3.om",
                "available": true,
                "source": "om-a8w8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "InceptionV3.om",
                "performance": [
                    {
                        "value": "5.15",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "194.26",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "30.555",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "28.0",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "InceptionV3_fp16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-inceptionv3/resolve/main/InceptionV3_fp16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-fp16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "InceptionV3_fp16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "10.398",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "95.48",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "131.305",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "153.855",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "InceptionV3.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-inceptionv3/resolve/main/InceptionV3.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "InceptionV3.onnx"
            },
            {
                "title": "Inceptionv3.zip",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-inceptionv3/resolve/main/Inceptionv3.zip",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "Inceptionv3.zip"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/ ",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "hs9rrefl5c00",
        "name": "YOLOv7",
        "description": "YOLOv7在速度与精度方面均超越现有已知目标检测器：在5-160 FPS范围内表现最优，并在GPU V100上以30+ FPS实现56.8% AP的最高精度。其YOLOv7-E6模型在V100上达到56 FPS和55.9% AP，相比基于Transformer的SWIN-L Cascade-Mask R-CNN（A100 9.2 FPS，53.9% AP）速度提升509%且精度提高2%；相较基于卷积的ConvNeXt-XL Cascade-Mask R-CNN（A100 8.6 FPS，55.2% AP）速度提升551%且精度提高0.7%。此外，YOLOv7在速度与精度上均优于YOLOR、YOLOX、YOLOv5等主流检测器，且仅使用MS COCO数据集从头训练，未借助任何预训练权重。",
        "descriptionZh": "YOLOv7在速度与精度方面均超越现有已知目标检测器：在5-160 FPS范围内表现最优，并在GPU V100上以30+ FPS实现56.8% AP的最高精度。其YOLOv7-E6模型在V100上达到56 FPS和55.9% AP，相比基于Transformer的SWIN-L Cascade-Mask R-CNN（A100 9.2 FPS，53.9% AP）速度提升509%且精度提高2%；相较基于卷积的ConvNeXt-XL Cascade-Mask R-CNN（A100 8.6 FPS，55.2% AP）速度提升551%且精度提高0.7%。此外，YOLOv7在速度与精度上均优于YOLOR、YOLOX、YOLOv5等主流检测器，且仅使用MS COCO数据集从头训练，未借助任何预训练权重。",
        "descriptionEn": "YOLOv7 is a computer vision model for object detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-11-14 10:24:41",
        "updatedAt": "2025-11-29 14:49:58",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "assets/images/1712178182881282_test067_output.jpg",
        "coverImageUrl": "assets/images/1712178182881282_test067_output.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov7",
        "licenseUrl": "https://github.com/WongKinYiu/yolov7/blob/main/LICENSE.md",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov7",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // YOLOV7模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::YOLOV7) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov7/src/CMakeLists.txt)",
                "summary": "模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for YOLOv7. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "640x640"
            },
            {
                "name": "参数量",
                "value": "36.922M"
            },
            {
                "name": "计算量",
                "value": "110.553 GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "74.19",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "13.48",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "454.059",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "79.949",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "130.79",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "7.65",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "899.415",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "252.781",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "yolov7.pt",
                "size": "72.1 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov7/resolve/main/yolov7.pt",
                "available": true,
                "localFile": "yolov7.pt"
            },
            {
                "name": "yolov7.onnx",
                "size": "141 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov7/resolve/main/yolov7.onnx",
                "available": true,
                "localFile": "yolov7.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolov7",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov7",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov7/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov7/resolve/main/yolov7.om",
        "primaryDownloadLabel": "yolov7.om",
        "downloads": [
            {
                "title": "yolov7.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov7/resolve/main/yolov7.om",
                "available": true,
                "source": "om-a16w8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "yolov7.om",
                "performance": [
                    {
                        "value": "74.19",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "13.48",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "454.059",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "79.949",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov7_fp16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov7/resolve/main/yolov7_fp16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-fp16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "yolov7_fp16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "130.79",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "7.65",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "899.415",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "252.781",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov7.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov7/resolve/main/yolov7.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov7.pt"
            },
            {
                "title": "yolov7.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov7/resolve/main/yolov7.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov7.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/ ",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "hbcci1q1oc00",
        "name": "ResNet50",
        "description": "ResNet是残差网络(Residual Network)的缩写,该系列网络广泛用于目标分类等领域以及作为计算机视觉任务主干经典神经网络的一部分，典型的网络有ResNet50, ResNet101等。ResNet证明网络能够向更深（包含更多隐藏层）的方向发展。",
        "descriptionZh": "ResNet是残差网络(Residual Network)的缩写,该系列网络广泛用于目标分类等领域以及作为计算机视觉任务主干经典神经网络的一部分，典型的网络有ResNet50, ResNet101等。ResNet证明网络能够向更深（包含更多隐藏层）的方向发展。",
        "descriptionEn": "ResNet50 is a computer vision model for classification. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-09-22 20:40:35",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "assets/images/1702593768259586_res51.png",
        "coverImageUrl": "assets/images/1702593768259586_res51.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/ResNet50",
        "licenseUrl": "https://github.com/pytorch/vision/blob/v0.14.0/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/ResNet50",
        "quickStartMarkdownUrl": "xxx",
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "ResNet50模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // ResNet50模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::ResNet50) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/ResNet50/src/CMakeLists.txt)。",
                "summary": "ResNet50模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for ResNet50. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "224x224"
            },
            {
                "name": "参数量",
                "value": "25.530M"
            },
            {
                "name": "计算量",
                "value": "8.235GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "2.99",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "334.22",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "27.342",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "26.582",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "7.513",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "133.1",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "111.543",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "145.398",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "resnet50-0676ba61.pth",
                "size": "97.8 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet50/resolve/main/resnet50-0676ba61.pth",
                "available": true,
                "localFile": "resnet50-0676ba61.pth"
            },
            {
                "name": "resnet50.onnx",
                "size": "97.4 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet50/resolve/main/resnet50.onnx",
                "available": true,
                "localFile": "resnet50.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-resnet50",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet50",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet50/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet50/resolve/main/resnet50.om",
        "primaryDownloadLabel": "resnet50.om",
        "downloads": [
            {
                "title": "resnet50.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet50/resolve/main/resnet50.om",
                "available": true,
                "source": "om-a8w8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "resnet50.om",
                "performance": [
                    {
                        "value": "2.99",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "334.22",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "27.342",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "26.582",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "resnet50_fp16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet50/resolve/main/resnet50_fp16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-fp16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "resnet50_fp16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "7.513",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "133.1",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "111.543",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "145.398",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "resnet50-0676ba61.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet50/resolve/main/resnet50-0676ba61.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "resnet50-0676ba61.pth"
            },
            {
                "title": "resnet50.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet50/resolve/main/resnet50.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "resnet50.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/ ",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "h9k2a5agkk00",
        "name": "ResNet18",
        "description": "ResNet是残差网络(Residual Network)的缩写,该系列网络广泛用于目标分类等领域以及作为计算机视觉任务主干经典神经网络的一部分，典型的网络有ResNet18, ResNet101等。ResNet证明网络能够向更深（包含更多隐藏层）的方向发展。",
        "descriptionZh": "ResNet是残差网络(Residual Network)的缩写,该系列网络广泛用于目标分类等领域以及作为计算机视觉任务主干经典神经网络的一部分，典型的网络有ResNet18, ResNet101等。ResNet证明网络能够向更深（包含更多隐藏层）的方向发展。",
        "descriptionEn": "ResNet18 is a computer vision model for classification. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN. The mirror currently exposes 6 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-09-17 09:26:27",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "assets/images/1701602950053889_res18.png",
        "coverImageUrl": "assets/images/1701602950053889_res18.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/ResNet18",
        "licenseUrl": "https://github.com/pytorch/vision/blob/v0.14.0/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/ResNet18",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "ResNet18模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // ResNet18模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::ResNet18) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/ResNet18/src/CMakeLists.txt)。",
                "summary": "ResNet18模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for ResNet18. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "224x224"
            },
            {
                "name": "参数量",
                "value": "11.685M"
            },
            {
                "name": "计算量",
                "value": "3.643GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "1.35",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "738.62",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "11.435",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "13.43",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "resnet18-f37072fd.pth",
                "size": "44.7 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet18/resolve/main/resnet18-f37072fd.pth",
                "available": true,
                "localFile": "resnet18-f37072fd.pth"
            },
            {
                "name": "resnet18.onnx",
                "size": "44.6 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet18/resolve/main/resnet18.onnx",
                "available": true,
                "localFile": "resnet18.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-resnet18",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet18",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet18/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet18/resolve/main/resnet18.om",
        "primaryDownloadLabel": "resnet18.om",
        "downloads": [
            {
                "title": "resnet18.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet18/resolve/main/resnet18.om",
                "available": true,
                "source": "om-a8w8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "resnet18.om",
                "performance": [
                    {
                        "value": "1.35",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "738.62",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "11.435",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "13.43",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "resnet18-f37072fd.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet18/resolve/main/resnet18-f37072fd.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "resnet18-f37072fd.pth"
            },
            {
                "title": "resnet18.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet18/resolve/main/resnet18.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "resnet18.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/ ",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "h94sd5f0v800",
        "name": "YOLOv8l",
        "description": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLOv8l在之前的YOLO版本的基础上进行了改进，在继承了原有YOLO网络模型优点的基础上，引入了新的特效和优化，具有更高的检测精度。",
        "descriptionZh": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLOv8l在之前的YOLO版本的基础上进行了改进，在继承了原有YOLO网络模型优点的基础上，引入了新的特效和优化，具有更高的检测精度。",
        "descriptionEn": "YOLOv8l is a computer vision model for detection. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN. The mirror currently exposes 6 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-09-15 22:03:30",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "检测"
        ],
        "image": "assets/images/1701422771011587_yolov8l.jpg",
        "coverImageUrl": "assets/images/1701422771011587_yolov8l.jpg",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN"
        ],
        "repositoryUrl": "https://gitee.com/Hispark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov8l",
        "licenseUrl": "https://github.com/ultralytics/ultralytics/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/Hispark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov8l",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "yolov8l 可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main(int argc, char *argv[])\n{\n    InferParam inferParam;\n    ParseCmd(argc, argv, inferParam)\n    DevInit(inferParam.aclConfigPath);\n    ModelInfer(inferParam);\n    Infer::DevDeInit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov8l/src/CMakeLists.txt)",
                "summary": "yolov8l 可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme",
                "summaryEn": "C++ quick-start notes for YOLOv8l. Covers runtime initialization, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "640x640"
            },
            {
                "name": "参数量",
                "value": "43.694M"
            },
            {
                "name": "计算量",
                "value": "170.256GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "metrics": [
                    {
                        "value": "93.842",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "10.656",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "480.774",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "90.754",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "yolov8l.pt",
                "size": "83.7 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8l/resolve/main/yolov8l.pt",
                "available": true,
                "localFile": "yolov8l.pt"
            },
            {
                "name": "yolov8l.onnx",
                "size": "167 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8l/resolve/main/yolov8l.onnx",
                "available": true,
                "localFile": "yolov8l.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolov8l",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8l",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8l/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8l/resolve/main/yolov8l.om",
        "primaryDownloadLabel": "yolov8l.om",
        "downloads": [
            {
                "title": "yolov8l.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8l/resolve/main/yolov8l.om",
                "available": true,
                "source": "om-a16w8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A16W8",
                "note": "A16W8",
                "localFile": "yolov8l.om",
                "performance": [
                    {
                        "value": "93.842",
                        "unit": "耗时（ms）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "10.656",
                        "unit": "性能（fps）",
                        "desc": "性能工具。"
                    },
                    {
                        "value": "480.774",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "90.754",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "yolov8l.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8l/resolve/main/yolov8l.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov8l.pt"
            },
            {
                "title": "yolov8l.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8l/resolve/main/yolov8l.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "yolov8l.onnx"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/ ",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "h8eivmf56c00",
        "name": "ResNet101",
        "description": "ResNet是ImageNet竞赛中分类问题效果较好的网络，它引入了残差学习的概念，通过增加直连通道来保护信息的完整性，解决信息丢失、梯度消失、梯度爆炸等问题，让很深的网络也得以训练。ResNet有不同的网络层数，常用的有18-layer、34-layer、50-layer、101-layer、152-layer。",
        "descriptionZh": "ResNet是ImageNet竞赛中分类问题效果较好的网络，它引入了残差学习的概念，通过增加直连通道来保护信息的完整性，解决信息丢失、梯度消失、梯度爆炸等问题，让很深的网络也得以训练。ResNet有不同的网络层数，常用的有18-layer、34-layer、50-layer、101-layer、152-layer。",
        "descriptionEn": "ResNet101 is a computer vision model for classification. The original upstream description is preserved in Chinese, and this mirror provides an English summary for bilingual browsing. Framework: PyTorch. OS: OpenHarmony and Linux. Compute targets: Hi3403V100 SVP_NNN and Hi3403V100 NNN. The mirror currently exposes 7 downloadable artifacts, along with quick-start resources when available.",
        "date": "2025-09-13 18:06:31",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "assets/images/1700943569813507_res101.png",
        "coverImageUrl": "assets/images/1700943569813507_res101.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenHarmony",
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN",
            "Hi3403V100 NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/ResNet101",
        "licenseUrl": "https://github.com/pytorch/vision/blob/v0.14.0/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/ResNet101",
        "quickStartMarkdownUrl": "xxx",
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "ResNet101模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // ResNet101模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::ResNet101) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/ResNet101/src/CMakeLists.txt)。",
                "summary": "ResNet101模型可以通过以下代码完成快速推理",
                "summaryEn": "C++ quick-start notes for ResNet101. Covers runtime initialization, model loading, inference execution, configuration handling, build instructions, and references to shared runtime libraries."
            }
        ],
        "detailParams": [
            {
                "name": "输入",
                "value": "224x224"
            },
            {
                "name": "参数量",
                "value": "44.496M"
            },
            {
                "name": "计算量",
                "value": "15.686GFLOPs"
            }
        ],
        "performance": [
            {
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "metrics": [
                    {
                        "value": "4.76",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "210.03",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "45.933",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "46.348",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "metrics": [
                    {
                        "value": "12.033",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "83.102",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "172.169",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "220.055",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            }
        ],
        "originModels": [
            {
                "name": "resnet101.onnx",
                "size": "170 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet101/resolve/main/resnet101.onnx",
                "available": true,
                "localFile": "resnet101.onnx"
            },
            {
                "name": "resnet101-63fe2227.pth",
                "size": "171 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet101/resolve/main/resnet101-63fe2227.pth",
                "available": true,
                "localFile": "resnet101-63fe2227.pth"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-resnet101",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet101",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet101/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet101/resolve/main/resnet101.om",
        "primaryDownloadLabel": "resnet101.om",
        "downloads": [
            {
                "title": "resnet101.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet101/resolve/main/resnet101.om",
                "available": true,
                "source": "om-a8w8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "engine": "Hi3403V100 SVP_NNN",
                "quantization": "A8W8",
                "note": "A8W8",
                "localFile": "resnet101.om",
                "performance": [
                    {
                        "value": "4.76",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "210.03",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "45.933",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "46.348",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "resnet101_fp16_Hi3403V100-NNN.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet101/resolve/main/resnet101_fp16_Hi3403V100-NNN.om",
                "available": true,
                "source": "om-fp16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "engine": "Hi3403V100 NNN",
                "quantization": "FP16",
                "note": "FP16",
                "localFile": "resnet101_fp16_Hi3403V100-NNN.om",
                "performance": [
                    {
                        "value": "12.033",
                        "unit": "耗时（ms）",
                        "desc": ""
                    },
                    {
                        "value": "83.102",
                        "unit": "性能（fps）",
                        "desc": ""
                    },
                    {
                        "value": "172.169",
                        "unit": "单帧内存带宽（MB）",
                        "desc": ""
                    },
                    {
                        "value": "220.055",
                        "unit": "内存（MB）",
                        "desc": ""
                    }
                ]
            },
            {
                "title": "resnet101.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet101/resolve/main/resnet101.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "resnet101.onnx"
            },
            {
                "title": "resnet101-63fe2227.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet101/resolve/main/resnet101-63fe2227.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "resnet101-63fe2227.pth"
            },
            {
                "title": "CANN工具",
                "href": "https://github.com/GitBubble/hisilicon-developer-portal-mirror/releases/download/svp-nnn-pc-v1.0.6.0/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            },
            {
                "title": "SDK",
                "href": "https://gitee.com/HiSpark/ss928v100_clang/tree/Beta-v0.9.1/ ",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "engine": "",
                "quantization": "",
                "note": "",
                "localFile": null
            }
        ]
    }
];

if (typeof window !== 'undefined') {
    window.modelsData = modelsData;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { modelsData };
}
