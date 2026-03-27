// Generated from api_all_models.json and api_all_details.json
const modelsData = [
    {
        "id": "j6v87p1oi000",
        "name": "DeepSort",
        "description": "DeepSort是一种多目标跟踪方法，简单有效。该方法将外观信息集成起来，提高了分拣性能，能够在较长遮挡时间下仍能进行有效的跟踪。该框架将大量的复杂计算放入离线预训练阶段，这个阶段在重识别数据集上学习一个深度关联度量。在线应用阶段，建立度量，在视觉外观空间中使用最近邻查询跟踪关联。本模型能够在较快帧率下实现较高精度的识别。",
        "date": "2026-03-26 23:59:38",
        "updatedAt": "2026-03-27 19:43:15",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "多目标跟踪"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1736139606130691%2F20260326235720.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1736139606130691%2F20260326235720.jpg",
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
                "content": "模型可以通过以下代码完成快速推理\nint main(int argc, char **argv) {\n  if (argc < 4) {\n    std::cerr << \"Usage: ./main <yolov5.om> <resnet18.om> \"\n           \"<image_dir_or_file> [config.json]\" << std::endl;\n    return -1;\n  }\n\n  // 初始化 NPU 驱动设备\n  if (Infer::DevInit(\"\") != Infer::SUCCESS) {\n    std::cerr << \"Device Init Failed.\" << std::endl;\n    return -1;\n  }\n\n  // 构建默认超参数配置\n  DeepSORTConfig config;\n  config.yoloModelPath = argv[1];\n  config.resnetModelPath = argv[2];\n  config.yoloConfThres = 0.3f;\n  config.yoloNmsThres = 0.4f;\n  config.maxCosineDistance = 0.15f;\n  config.nnBudget = 100;\n\n  // 卡尔曼滤波器数学对齐自检\n  RunKalmanParityCheck();\n  std::string configPath = (argc > 4) ? argv[4] : \"\";\n  if (!configPath.empty()) {\n    LoadConfigFromJson(configPath, config);\n  }\n\n  std::string inputPath = argv[3];\n  std::string outFilename = BuildOutputFilename(inputPath);\n  {\n    DeepSortController deepSort(config);\n    if (deepSort.Init() != Infer::SUCCESS) {\n      std::cerr << \"DeepSort Init Failed.\" << std::endl;\n      Infer::DevDeInit();\n      return -1;\n    }\n\n    std::vector<std::string> framePaths = GetFramePaths(inputPath);\n    if (framePaths.empty()) {\n      std::cerr << \"No image files found in: \" << inputPath << std::endl;\n      Infer::DevDeInit();\n      return -1;\n    }\n\n    RunTrackingPipeline(deepSort, framePaths, outFilename);\n  }\n\n  Infer::DevDeInit();\n  return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/tracking/deepsort/CMakeLists.txt)。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/yolov5s_om-A8W8.om",
        "primaryDownloadLabel": "yolov5s_om-A8W8.om",
        "downloads": [
            {
                "title": "yolov5s_om-A8W8.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/yolov5s_om-A8W8.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "note": "",
                "localFile": "yolov5s_om-A8W8.om"
            },
            {
                "title": "reid_net_om-A8W8.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/reid_net_om-A8W8.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "note": "",
                "localFile": "reid_net_om-A8W8.om"
            },
            {
                "title": "yolov5s.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/yolov5s.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "note": "",
                "localFile": "yolov5s.om"
            },
            {
                "title": "reid_net.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/reid_net.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "note": "",
                "localFile": "reid_net.om"
            },
            {
                "title": "yolov5s.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/yolov5s.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "reid_net.onnx"
            },
            {
                "title": "yolov5s.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/yolov5s.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov5s.onnx"
            },
            {
                "title": "reid_net.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/reid_net.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "reid_net.onnx"
            },
            {
                "title": "yolov5s.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/yolov5s.om",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "A8W8",
                "localFile": "yolov5s.om"
            },
            {
                "title": "reid_net.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-deepsort/resolve/main/reid_net.om",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "A8W8",
                "localFile": "reid_net.om"
            },
            {
                "title": "CANN工具",
                "href": "https://gitee.com/link?target=https%3A%2F%2Fhispark-obs.obs.cn-east-3.myhuaweicloud.com%2FSVP_NNN_PC_V1.0.6.5.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "note": "",
                "localFile": null
            },
            {
                "title": "编译工具库",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
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
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "j67cjvq5vs00",
        "name": "MobileNetV2",
        "description": "MobileNetV2是对MobileNetV1的改进，是一种轻量级的神经网络。MobileNetV2保留了V1版本的深度可分离卷积，增加了线性瓶颈（Linear Bottleneck）和倒残差（Inverted Residual）。",
        "date": "2026-03-24 16:23:20",
        "updatedAt": "2026-03-26 09:35:37",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1700942949056514%2Fmobilev2.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1700942949056514%2Fmobilev2.png",
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
                "content": "MobileNetV2可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // MobileNetV2 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::MobileNetV2) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/MobileNetV2/src/CMakeLists.txt)"
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
                "href": null,
                "available": false,
                "localFile": null
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
                "note": "",
                "localFile": "mobileNetV2.om"
            },
            {
                "title": "mobilenet_v2-b0353104.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-mobilenetv2/resolve/main/mobilenet_v2-b0353104.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "mobilenet_v2-b0353104.pth"
            },
            {
                "title": "mobilenet_v2.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-mobilenetv2/resolve/main/mobilenet_v2.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "mobilenet_v2.onnx"
            },
            {
                "title": "mobilenet_v2-b0353104.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-mobilenetv2/resolve/main/mobilenet_v2-b0353104.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "mobilenet_v2-b0353104.pth"
            },
            {
                "title": "mobilenetV2.onnx",
                "href": null,
                "available": false,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": null
            },
            {
                "title": "mobileNetV2.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-mobilenetv2/resolve/main/mobileNetV2.om",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "A8W8",
                "localFile": "mobileNetV2.om"
            },
            {
                "title": "编译工具链",
                "href": "https://gitee.com/HiSpark/pegasus/blob/Beta-v0.9.1/docs/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/Hi3403V100%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97.md#241%E5%AE%89%E8%A3%85clang%E4%BA%A4%E5%8F%89%E7%BC%96%E8%AF%91%E5%99%A8",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "note": "",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-mobilenetv2/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "j3vsc0jtvs00",
        "name": "Vit-B-16",
        "description": "`Transformer` 架构已广泛应用于自然语言处理领域。Vision Transformer（ViT）模型在计算机视觉领域中对CNN的依赖不是必需的，直接将其应用于图像块序列来进行图像分类时，也能得到和目前卷积网络相媲美的准确率。",
        "date": "2026-03-17 17:45:49",
        "updatedAt": "2026-03-26 09:35:38",
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 NNN引擎上模型性能待进一步优化",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701276106686467%2F20250915111221_469_20.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701276106686467%2F20250915111221_469_20.png",
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
                "content": "Vit-B-16模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n  EnvInit();\n  std::string omModelPath = \"/path/to/model.om\"; // Vit-B-16模型文件路径 \n  std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n  std::unique_ptr<Model> model = std::make_unique<Model>();\n  if (model->Load(omModelPath, ModelType::ResNet50) != 0) {\n    LOG(ERROR) << \"fail to load model\";\n    return -1;\n  }\n  auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n  if (ret.size() == 0) {\n    LOG(ERROR) << \"fail to infer model\";\n    model->Unload();\n    return -1;\n  }\n  if (model->Unload() != 0) {\n    LOG(ERROR) << \"fail to unload model\";\n    return -1;\n  }\n  EnvDeinit();\n  return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/Vit-B-16/src/CMakeLists.txt)。"
            }
        ],
        "detailParams": [
            {
                "name": "计算量",
                "value": "35.994GFLOPS"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16/resolve/main/vit_base_patch16_224_om-A16W8.om",
        "primaryDownloadLabel": "vit_base_patch16_224_om-A16W8.om",
        "downloads": [
            {
                "title": "vit_base_patch16_224_om-A16W8.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16/resolve/main/vit_base_patch16_224_om-A16W8.om",
                "available": true,
                "source": "om-A16W8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "note": "",
                "localFile": "vit_base_patch16_224_om-A16W8.om"
            },
            {
                "title": "vit_base_patch16_224.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16/resolve/main/vit_base_patch16_224.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "note": "",
                "localFile": "vit_base_patch16_224.om"
            },
            {
                "title": "vit_base_patch16_224.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16/resolve/main/vit_base_patch16_224.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "vit_base_patch16_224_bs1.onnx"
            },
            {
                "title": "vit_base_patch16_224.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16/resolve/main/vit_base_patch16_224.pt",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "vit_base_patch16_224.pt"
            },
            {
                "title": "vit_base_patch16_224_bs1.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16/resolve/main/vit_base_patch16_224_bs1.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "vit_base_patch16_224_bs1.onnx"
            },
            {
                "title": "vit_base_patch16_224.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16/resolve/main/vit_base_patch16_224.om",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "A16W8",
                "localFile": "vit_base_patch16_224.om"
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vit-b-16/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "j3n1o7csso00",
        "name": "SuperPoint",
        "description": "SuperPoint模型的全卷积神经网络架构对全尺寸图像进行操作，并在单次前向传递中产生伴随固定长度描述符的兴趣点检测。该模型有一个单一的共享编码器来处理和减少输入图像的维数。在编码器之后，该架构分成两个解码器“头”，它们学习任务特定权重——一个用于兴趣点检测，另一个用于感兴趣点描述。大多数网络参数在两个任务之间共享，这与传统系统不同，传统系统首先检测兴趣点，然后计算描述符，并且缺乏跨两个任务共享计算和表示的能力。",
        "date": "2026-03-16 21:11:02",
        "updatedAt": "2026-03-26 09:35:38",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "特征点检测"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1702559012290562%2Fcat_320x240_draw_keypoints.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1702559012290562%2Fcat_320x240_draw_keypoints.jpg",
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
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n    std::string filePath= \"/path/to/file_list.json\"; // 输入文本文件路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::SuperPoint) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(filePath, FileType::JsonFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码仅展示了主要流程，详细实现请参考SuperPoint (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/point/SuperPoint)。"
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
                "href": null,
                "available": false,
                "localFile": null
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-superpoint",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/resolve/main/superpoint_bs1_om-A8W8.om",
        "primaryDownloadLabel": "superpoint_bs1_om-A8W8.om",
        "downloads": [
            {
                "title": "superpoint_bs1_om-A8W8.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/resolve/main/superpoint_bs1_om-A8W8.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "note": "",
                "localFile": "superpoint_bs1_om-A8W8.om"
            },
            {
                "title": "superpoint_bs1.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/resolve/main/superpoint_bs1.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "note": "",
                "localFile": "superpoint_bs1.om"
            },
            {
                "title": "superpoint_bs1.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/resolve/main/superpoint_bs1.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "superpoint_bs1.onnx"
            },
            {
                "title": "superPointNet_170000_checkpoint.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/resolve/main/superPointNet_170000_checkpoint.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "superPointNet_170000_checkpoint.pth"
            },
            {
                "title": "superpoint_bs1.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/resolve/main/superpoint_bs1.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "superpoint_bs1.onnx"
            },
            {
                "title": "SuperPointNet.pth",
                "href": null,
                "available": false,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": null
            },
            {
                "title": "superpoint_bs1.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/resolve/main/superpoint_bs1.om",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "A8W8",
                "localFile": "superpoint_bs1.om"
            },
            {
                "title": "link",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/resolve/main/link",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "link"
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-superpoint/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "j3mmucroso00",
        "name": "DenseNet121",
        "description": "DenseNet 针对 ResNet 的冗余结构提出了改进：让网络中的每一层和前面的所有层相连，同时把每一层设计的比较窄，使每一层学到的特征变少从而降低冗余。除了减少参数量之外，该结构还有减轻梯度消失问题、增强特征传播等优点。",
        "date": "2026-03-16 20:23:49",
        "updatedAt": "2026-03-26 09:35:38",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1700942504460291%2Fdes.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1700942504460291%2Fdes.png",
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
                "content": "DenseNet121可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // DenseNet121 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::DenseNet121) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/DenseNet121/src/CMakeLists.txt)"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121/resolve/main/densenet121_om-A8W8.om",
        "primaryDownloadLabel": "densenet121_om-A8W8.om",
        "downloads": [
            {
                "title": "densenet121_om-A8W8.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121/resolve/main/densenet121_om-A8W8.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "note": "",
                "localFile": "densenet121_om-A8W8.om"
            },
            {
                "title": "densenet121.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121/resolve/main/densenet121.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "note": "",
                "localFile": "densenet121.om"
            },
            {
                "title": "densenet121.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121/resolve/main/densenet121.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "densenet121-a639ec97.pth"
            },
            {
                "title": "densenet121.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121/resolve/main/densenet121.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "densenet121.onnx"
            },
            {
                "title": "densenet121-a639ec97.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121/resolve/main/densenet121-a639ec97.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "densenet121-a639ec97.pth"
            },
            {
                "title": "densenet121.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121/resolve/main/densenet121.om",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "A8W8",
                "localFile": "densenet121.om"
            },
            {
                "title": "densenet_dlite.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "FP16",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-densenet121/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "j3mlrvvlvs00",
        "name": "ShuffleNetV2",
        "description": "ShuffleNetV2是Shufflenet的升级版本，作为轻量级网络，通过遵循降低网络的碎片程度、减少element-wise等设计准则，在保证精度的前提下进一步追求高性能。",
        "date": "2026-03-16 20:19:07",
        "updatedAt": "2026-03-26 09:35:38",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1700942607089666%2Fshu.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1700942607089666%2Fshu.png",
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
                "content": "ShuffleNetV2可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // ShuffleNetV2 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::ShuffleNetV2) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/ShuffleNetV2/src/CMakeLists.txt)"
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
                "href": null,
                "available": false,
                "localFile": null
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-shufflenetv2",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/resolve/main/shufflenetv2_om-A8W8.om",
        "primaryDownloadLabel": "shufflenetv2_om-A8W8.om",
        "downloads": [
            {
                "title": "shufflenetv2_om-A8W8.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/resolve/main/shufflenetv2_om-A8W8.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "note": "",
                "localFile": "shufflenetv2_om-A8W8.om"
            },
            {
                "title": "shufflenetv2.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/resolve/main/shufflenetv2.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "note": "",
                "localFile": "shufflenetv2.om"
            },
            {
                "title": "shufflenetv2_x1-5666bf0f80.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/resolve/main/shufflenetv2_x1-5666bf0f80.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "shufflenetv2_x1-5666bf0f80.pth"
            },
            {
                "title": "shufflenetv2.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/resolve/main/shufflenetv2.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "shufflenetv2.onnx"
            },
            {
                "title": "shufflenetv2_x1-5666bf0f80.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/resolve/main/shufflenetv2_x1-5666bf0f80.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "shufflenetv2_x1-5666bf0f80.pth"
            },
            {
                "title": "shufflenetv2_fix.onnx",
                "href": null,
                "available": false,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": null
            },
            {
                "title": "shufflenetv2.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/resolve/main/shufflenetv2.om",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "A8W8",
                "localFile": "shufflenetv2.om"
            },
            {
                "title": "shufflenetv2_dlite.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "FP16",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-shufflenetv2/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "j3m99qggso00",
        "name": "SqueezeNet1_1",
        "description": "Squeezenet的设计采用了卷积替换、减少卷积通道数和降采样操作后置等策略，旨在在不大幅降低模型精度的前提下，最大程度的提高运算速度。",
        "date": "2026-03-16 19:24:13",
        "updatedAt": "2026-03-26 09:35:38",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1700942720335875%2Fsq.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1700942720335875%2Fsq.png",
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
                "content": "可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // SqueezeNet1_1 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::SqueezeNet1_1) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/ResNet50/src/CMakeLists.txt)"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1/resolve/main/squeezenet_om-A8W8.om",
        "primaryDownloadLabel": "squeezenet_om-A8W8.om",
        "downloads": [
            {
                "title": "squeezenet_om-A8W8.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1/resolve/main/squeezenet_om-A8W8.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "note": "",
                "localFile": "squeezenet_om-A8W8.om"
            },
            {
                "title": "squeezenet.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1/resolve/main/squeezenet.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "note": "",
                "localFile": "squeezenet.om"
            },
            {
                "title": "squeezenet1_1-f364aa15.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1/resolve/main/squeezenet1_1-f364aa15.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "squeezenet.onnx"
            },
            {
                "title": "squeezenet1_1-f364aa15.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1/resolve/main/squeezenet1_1-f364aa15.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "squeezenet1_1-f364aa15.pth"
            },
            {
                "title": "squeezenet.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1/resolve/main/squeezenet.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "squeezenet.onnx"
            },
            {
                "title": "squeezenet.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1/resolve/main/squeezenet.om",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "A8W8",
                "localFile": "squeezenet.om"
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-squeezenet1-1/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "j3m8r949vs00",
        "name": "Chinese-CLIP",
        "description": "Chinese-CLIP 是 CLIP 模型的中文版本。CLIP 通过对比学习方式，同时学习图像和文本的表示，并能够理解两者之间的语义关联。Chinese-CLIP 使用约 2 亿规模的中文图文对进行训练，其核心目标是解决中文场景下的跨模态检索、图像表示生成等任务。",
        "date": "2026-03-16 19:22:14",
        "updatedAt": "2026-03-26 09:35:38",
        "badge": null,
        "betaVersionDesc": "",
        "category": "多模态",
        "tags": [
            "图文匹配"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1734291744751619%2Fclip.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1734291744751619%2Fclip.png",
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
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoov/tree/master/samples/built-in/classification/Chinese-CLIP",
        "licenseUrl": "https://github.com/OFA-Sys/Chinese-CLIP/blob/master/MIT-LICENSE.txt",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoov/tree/master/samples/built-in/classification/Chinese-CLIP",
        "quickStartMarkdownUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/Chinese-CLIP/doc/快速开始.md",
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "Chinese-CLIP模型可以通过以下代码完成快速推理\n\nusing namespace Infer;\n\nint main(int argc, char* argv[])\n{\n    ClipInfer model;\n    if (!model.ExecuteParams(argc, argv)) {\n        LOG(ERROR) << \"Fail to parse cmd!\";\n        return -1;\n    }\n    EnvInit(model.acl_path_);\n    model.LoadModel();\n    std::vector<std::vector<float>> zeroshotWeights = model.InferTxt();\n    for (size_t i = 0; i < model.imgFileList_.size(); ++i)\n    {\n        std::vector<float> imgResult = model.InferImageSingle(model.imgFileList_[i][0]);\n        std::vector<float> tmp = model.ComputeModelLogits(imgResult, zeroshotWeights, 512, model.txtFileList_.size(), model.imgFileList_[i][0]);\n    }\n    model.UnLoadModel();\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码仅展示了主要流程，详细实现请参考Chinese-CLIP (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/Chinese-CLIP)。"
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
        "originModels": [
            {
                "name": "vit-b-16_img_sim.onnx",
                "size": "332 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/vit-b-16_img_sim.onnx",
                "available": true,
                "localFile": "vit-b-16_img_sim.onnx"
            },
            {
                "name": "vit-b-16_txt_sim.onnx",
                "size": "394 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/vit-b-16_txt_sim.onnx",
                "available": true,
                "localFile": "vit-b-16_txt_sim.onnx"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/clip_img_om-A16W8.om",
        "primaryDownloadLabel": "clip_img_om-A16W8.om",
        "downloads": [
            {
                "title": "clip_img_om-A16W8.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/clip_img_om-A16W8.om",
                "available": true,
                "source": "om-A16W8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "note": "",
                "localFile": "clip_img_om-A16W8.om"
            },
            {
                "title": "clip_text_om-A16W8.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/clip_text_om-A16W8.om",
                "available": true,
                "source": "om-A16W8",
                "sourceLabel": "A16W8",
                "group": "编译模型",
                "note": "",
                "localFile": "clip_text_om-A16W8.om"
            },
            {
                "title": "vit-b-16_img_sim.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/vit-b-16_img_sim.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "vit-b-16_img_sim.onnx"
            },
            {
                "title": "vit-b-16_txt_sim.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/vit-b-16_txt_sim.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "vit-b-16_txt_sim.onnx"
            },
            {
                "title": "clip_cn_vit-b-16.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/clip_cn_vit-b-16.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "clip_cn_vit-b-16.pt"
            },
            {
                "title": "vit-b-16_img_sim.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/vit-b-16_img_sim.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "vit-b-16_img_sim.onnx"
            },
            {
                "title": "vit-b-16_txt_sim.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/vit-b-16_txt_sim.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "vit-b-16_txt_sim.onnx"
            },
            {
                "title": "clip_cn_vit-b-16.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/clip_cn_vit-b-16.pt",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "clip_cn_vit-b-16.pt"
            },
            {
                "title": "clip_img.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/clip_img.om",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "A16W8",
                "localFile": "clip_img.om"
            },
            {
                "title": "clip_text.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/clip_text.om",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "A16W8",
                "localFile": "clip_text.om"
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-chinese-clip/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "j3m873lcso00",
        "name": "Swin-Transformer",
        "description": "Swin-Transformer是针对于图片处理设计的基于Transformer架构的神经网络。该网络针对原始Transformer迁移到图片端后计算量过大，复用困难的问题，提出了新的swin-block以代替原有的attention架构。模型以窗口的attention方式极大地减少了图像不同区域间的互相响应，同时也避免了部分冗余信息的产生。最终，模型在减少了大量计算量的同时，在不同的视觉传统任务上也有了效果的提升。",
        "date": "2026-03-16 19:19:28",
        "updatedAt": "2026-03-26 09:35:38",
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 NNN引擎上模型性能待进一步优化",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701485580845059%2Fswint.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701485580845059%2Fswint.png",
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
                "content": "Swin-Transformer可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // Swin-Transformer 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::SwinT) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/Swin-Transformer/src/CMakeLists.txt)"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin_om-A8W8.om",
        "primaryDownloadLabel": "swin_om-A8W8.om",
        "downloads": [
            {
                "title": "swin_om-A8W8.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin_om-A8W8.om",
                "available": true,
                "source": "om-A8W8",
                "sourceLabel": "A8W8",
                "group": "编译模型",
                "note": "",
                "localFile": "swin_om-A8W8.om"
            },
            {
                "title": "swin.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin.om",
                "available": true,
                "source": "om-FP16",
                "sourceLabel": "FP16",
                "group": "编译模型",
                "note": "",
                "localFile": "swin.om"
            },
            {
                "title": "swin.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "swin_sim.onnx"
            },
            {
                "title": "swin.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "swin.onnx"
            },
            {
                "title": "swin_tiny_patch4_window7_224.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin_tiny_patch4_window7_224.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "swin_tiny_patch4_window7_224.pth"
            },
            {
                "title": "swin_sim.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin_sim.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "swin_sim.onnx"
            },
            {
                "title": "swin.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/swin.om",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "A8W8",
                "localFile": "swin.om"
            },
            {
                "title": "swin_dlite.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "FP16",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-swin-transformer/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "ivr055ncp400",
        "name": "Pi0",
        "description": "Pi0是一款视觉-语言-动作(VLA)通用机器人大模型，它基于预训练视觉语言模型(VLM)和流匹配(Flow Matching)机制，能够将自然语言指令直接转换为机器人可执行的连续动作序列，从而精准控制机器人完成复杂、高灵巧度的操作任务。",
        "date": "2026-03-04 20:07:37",
        "updatedAt": "2026-03-06 17:34:59",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "具身智能"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1732223942393858%2Fframe_17670.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1732223942393858%2Fframe_17670.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "OpenEuler"
        ],
        "computingPower": [
            "Hi3591PV100"
        ],
        "repositoryUrl": null,
        "licenseUrl": null,
        "quickStartUrl": null,
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [],
        "detailParams": [],
        "originModels": [],
        "hfRepoId": null,
        "hfRepoUrl": null,
        "hfReadmeUrl": null,
        "primaryDownloadUrl": null,
        "primaryDownloadLabel": null,
        "downloads": []
    },
    {
        "id": "ivcifqkd0400",
        "name": "ACT",
        "description": "ACT（Action Chunking with Transformers）是面向机器人学习场景的高性能端到端动作控制模型。相比传统模块化机器人控制模型，ACT采用轻量化Transformer架构作为核心骨干进行动作表征学习，结合多模态感知融合模块和时序动作优化网络，在控制精度和实时响应速度上均有显著提升。",
        "date": "2026-03-03 10:30:33",
        "updatedAt": "2026-03-04 16:06:22",
        "badge": null,
        "betaVersionDesc": "",
        "category": "多模态",
        "tags": [
            "具身智能"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1731868158459906%2F%E6%A8%A1%E5%9E%8B%E5%B0%81%E9%9D%A2.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1731868158459906%2F%E6%A8%A1%E5%9E%8B%E5%B0%81%E9%9D%A2.png",
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
                "content": "模型可以通过以下代码生成可执行文件，并开放接口由python调用执行推理，以 SVP_NNN 推理引擎为例。\n#include <fstream>\n#include <iostream>\n#include \"sample_process.h\"\n#include \"utils.h\"\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // 初始化推理环境（只执行一次）\n    SampleProcess sample;\n    if (sample.InitResource() != SUCCESS) {\n        cerr << \"Init resource failed\" << endl;\n        return -1;\n    }\n\n    // 加载模型（只执行一次）\n    if (sample.LoadModel() != SUCCESS) {\n        cerr << \"Load model failed\" << endl;\n        sample.DestroyResource();\n        return -1;\n    }\n\n    // 循环处理多次输入\n    while (true) {\n        vector<const void*> input_datas;\n        vector<size_t> input_sizes;\n        const int INPUT_COUNT = 3;\n\n        // 读取输入数据（保持原有逻辑）\n        bool readSuccess = true;\n        for (int i = 0; i < INPUT_COUNT; ++i) {\n            uint32_t data_size;\n            cin.read(reinterpret_cast<char*>(&data_size), sizeof(data_size));\n            if (!cin.good()) {\n                cerr << \"Read input \" << i << \" size failed\" << endl;\n                readSuccess = false;\n                break;\n            }\n\n            void* data = nullptr;\n            svp_acl_error ret = svp_acl_rt_malloc(&data, data_size, SVP_ACL_MEM_MALLOC_NORMAL_ONLY);\n            if (ret != SVP_ACL_SUCCESS || data == nullptr) {\n                cerr << \"Malloc buffer for input \" << i << \" failed\" << endl;\n                readSuccess = false;\n                break;\n            }\n\n            cin.read(reinterpret_cast<char*>(data), data_size);\n            if (!cin.good()) {\n                cerr << \"Read input \" << i << \" data failed\" << endl;\n                svp_acl_rt_free(data);\n                readSuccess = false;\n                break;\n            }\n\n            input_datas.push_back(data);\n            input_sizes.push_back(data_size);\n        }\n\n        // 检查是否读取失败（比如到达输入末尾）\n        if (!readSuccess) {\n            // 释放已分配的内存\n            for (auto ptr : input_datas) svp_acl_rt_free(ptr);\n            break;\n        }\n\n        // 设置输入并执行推理\n        sample.SetInputDatas(input_datas, input_sizes);\n        if (sample.Process() != SUCCESS) {\n            cerr << \"Inference failed\" << endl;\n        } else {\n            cout << \"3-input inference success\" << endl;  // 注意这里修正了原代码的数字错误（5->3）\n        }\n\n        // 释放当前批次的输入内存\n        for (auto data : input_datas) svp_acl_rt_free(data);\n    }\n\n    // 最后释放所有资源\n    sample.DestroyResource();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于samples/contribute/ACT/SVP_NNN/src (https://gitee.com/HiSpark/modelzoo/tree/master/samples/contribute/ACT/SVP_NNN/src)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/contribute/ACT/SVP_NNN/src/CMakeLists.txt)。"
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
                "title": "ACT.zip",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-act/resolve/main/ACT.zip",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "ACT.zip"
            },
            {
                "title": "ACT.zip",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-act/resolve/main/ACT.zip",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "ACT.zip"
            },
            {
                "title": "act_distill_fp32_for_mindcmd_simp_release.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-act/resolve/main/act_distill_fp32_for_mindcmd_simp_release.om",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": "act_distill_fp32_for_mindcmd_simp_release.om"
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-act/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "ip92pbfkp400",
        "name": "CRNN",
        "description": "CRNN是卷积循环网络，本模型是一个基于其的中文 OCR 模型。",
        "date": "2026-02-12 10:58:59",
        "updatedAt": "2026-03-04 16:06:24",
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 SVP_NNN 和 NNN 引擎上模型性能待进一步优化",
        "category": "计算机视觉",
        "tags": [
            "OCR"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719628489359362%2FCRNN.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719628489359362%2FCRNN.png",
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
                "content": "CRNN模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // CRNN模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::CRNN) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考 文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/ocr/CRNN/src/CMakeLists.txt)"
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
                "title": "mixed_second_finetune_acc_97P7.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crnn/resolve/main/mixed_second_finetune_acc_97P7.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "crnn.onnx"
            },
            {
                "title": "mixed_second_finetune_acc_97P7.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crnn/resolve/main/mixed_second_finetune_acc_97P7.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "mixed_second_finetune_acc_97P7.pth"
            },
            {
                "title": "crnn.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crnn/resolve/main/crnn.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "crnn.onnx"
            },
            {
                "title": "crnn.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crnn/resolve/main/crnn.om",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": "crnn.om"
            },
            {
                "title": "CANN配置",
                "href": "https://hispark-obs.obs.cn-east-3.myhuaweicloud.com/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "toolkit",
                "sourceLabel": "工具链",
                "group": "工具链",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "iodtp8ht0400",
        "name": "GraspNet",
        "description": "GraspNet是一种基于点云输入的多阶段抓取姿态预测模型，由抓取视角估计和抓取姿态生成两个阶段组成，通过特征提取、视角估计、局部特征提取、抓取参数估计和预测解码一系列处理，最终生成包含抓取评分、抓取宽度、抓取高度、抓取深度、旋转矩阵、抓取中心点和物体ID的预测结果，旨在解决机器人抓取任务中的6D抓取姿态估计问题。",
        "date": "2026-02-09 19:42:15",
        "updatedAt": "2026-02-12 11:24:22",
        "badge": "Beta",
        "betaVersionDesc": "该模型跟随Hi3591P配套版本正式发布",
        "category": "计算机视觉",
        "tags": [
            "具身智能"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1726646426140674%2Fgraspnet_16_9.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1726646426140674%2Fgraspnet_16_9.jpg",
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
        "quickStartMarkdownUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/embodied_intelligence/GraspNet/README.md",
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n    std::string filePath= \"/path/to/file_list_1.json\"; // 输入文本文件路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::GraspNet) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(filePath, FileType::JsonFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/embodied_intelligence/GraspNet/src/CMakeLists.txt)。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-graspnet/resolve/main/graspnet%5B%E8%AF%A5%E6%A8%A1%E5%9E%8B%E6%96%87%E4%BB%B6%E4%BB%85%E7%94%A8%E4%BA%8E%E9%9D%9E%E5%95%86%E7%94%A8%5D.onnx",
        "primaryDownloadLabel": "graspnet[该模型文件仅用于非商用].onnx",
        "downloads": [
            {
                "title": "graspnet[该模型文件仅用于非商用].onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-graspnet/resolve/main/graspnet%5B%E8%AF%A5%E6%A8%A1%E5%9E%8B%E6%96%87%E4%BB%B6%E4%BB%85%E7%94%A8%E4%BA%8E%E9%9D%9E%E5%95%86%E7%94%A8%5D.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "graspnet[该模型文件仅用于非商用].onnx"
            },
            {
                "title": "graspnet[该模型文件仅用于非商用].onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-graspnet/resolve/main/graspnet%5B%E8%AF%A5%E6%A8%A1%E5%9E%8B%E6%96%87%E4%BB%B6%E4%BB%85%E7%94%A8%E4%BA%8E%E9%9D%9E%E5%95%86%E7%94%A8%5D.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "graspnet[该模型文件仅用于非商用].onnx"
            },
            {
                "title": "graspnet_linux_aarch64[该模型文件仅用于非商用].om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "fp16",
                "localFile": null
            }
        ]
    },
    {
        "id": "indvkfmcp400",
        "name": "MiniCPM-4v-0.5B",
        "description": "MiniCPM-4v-0.5B: 小参数, 大智慧——端侧多模态模型\n\n由面壁智能(OpenBMB)打造的MiniCPM-4v-0.5B, 以0.53B的精简参数量，在端侧设备上实现了卓越的图文理解与交互能力。专为边缘计算场景设计，让每一分算力都充分发挥价值。\n\n三大核心优势：\n    1. 创新架构，轻装上阵\n通过创新的稀疏感知训练和视觉压缩技术，实现 16:1 视觉特征压缩比，在保证高精度的同时，极大降低了推理算力消耗与内存占用。\n    2. 高能数据，以小博大\n依托高密度数据体系，数据准备成本下降90%。通过汇聚全球高质量语料进行精细化对齐，用优质的数据训练模型，实现越级性能表现。\n    3. 高效训练，成本锐减\n采用原创 WSD 调度策略与“模型风洞”技术，相比传统方案，搜索算力节省超99%，整体训练成本节省约60%，为端侧模型的持续迭代提供高效路径。\n\n海思平台技术支撑：\n现已适配 Hi3403V100 平台，持续生成速度达 21 tokens/s，为边缘侧设备提供流程、敏捷的智能视觉体验。",
        "date": "2026-02-06 17:16:24",
        "updatedAt": "2026-03-26 09:35:38",
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 SVP_NNN引擎上模型性能待进一步优化。",
        "category": "自然语言处理",
        "tags": [
            "VLM"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1735709648093187%2FMiniCPM.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1735709648093187%2FMiniCPM.png",
        "framework": [
            "PyTorch"
        ],
        "supportOs": [
            "Linux"
        ],
        "computingPower": [
            "Hi3403V100 SVP_NNN"
        ],
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/vlm/MiniCPM/README.md",
        "licenseUrl": "https://mb-data-backup.obs.cn-north-4.myhuaweicloud.com/user/jiachao/OM%20%E6%96%87%E4%BB%B6%202.zip?AccessKeyId=HPUA2FP6SKIBEDLHP6HL&Expires=1805167766&Signature=ypfYmM/49tx3mxFyOHgvHvv9QeE%3D",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/vlm/MiniCPM/README.md",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "MiniCPM模型可以通过以下代码完成快速推理\n#include \"log.h\"\n#include \"MiniCpmInfer.h\"\n\nint main()\n{\n    EnvInit();\n    string result;\n    MiniCpmInfer model;\n    auto imagePath = \"../datasets/demo.png\"; // 图片地址\n    auto text = \"翻译\";      // 文本描述内容\n    LOG(INFO) << \"\\n Current question: \\n Text: \" << text << \"\\n Image path: \" << imagePath;\n    result = model.InferSingle(imagePath, text);\n    LOG(INFO) << \"\\nMiniCPM infer result: \\n\" << result;\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于目录 /samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)下，编译相关配置参考 CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/vlm/MiniCPM/src/CMakeLists.txt)。"
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
        "originModels": [],
        "hfRepoId": "shadow-cann/minicpm-v-0.5B",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/minicpm-v-0.5B",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/minicpm-v-0.5B/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/minicpm-v-0.5B",
        "primaryDownloadLabel": "OM 文件 2.zip",
        "downloads": [
            {
                "title": "OM 文件 2.zip",
                "href": "https://hf-mirror.com/shadow-cann/minicpm-v-0.5B",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": null
            }
        ]
    },
    {
        "id": "ie2sc9g1qk00",
        "name": "FastSpeech2",
        "description": "FastSpeech2 是一种高效的端到端语音合成模型。相比 FastSpeech，FastSpeech2 引入了多尺度时长预测器和能量 / 基频预测分支，优化了时长预测模块并新增韵律特征建模，在合成速度和语音自然度上均有大幅提升。",
        "date": "2026-01-08 16:18:57",
        "updatedAt": "2026-01-09 15:08:50",
        "badge": "Beta",
        "betaVersionDesc": "CANN包版本需要适配修改待发布",
        "category": "音频",
        "tags": [
            "文本转语音"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1722265270026243%2Ffastspeech2.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1722265270026243%2Ffastspeech2.jpg",
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
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/audio/FastSpeech2/README.md",
        "licenseUrl": "https://github.com/ming024/FastSpeech2/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/audio/FastSpeech2",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n    std::string filePath= \"/path/to/file_list.json\"; // 输入文本文件路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::FastSpeech2) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(filePath, FileType::JsonFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/audio/FastSpeech2/src/CMakeLists.txt)。"
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
        "originModels": [
            {
                "name": "fastspeech_hifigan_en.onnx",
                "size": "136 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fastspeech2/resolve/main/fastspeech_hifigan_en.onnx",
                "available": true,
                "localFile": "fastspeech_hifigan_en.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-fastspeech2",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fastspeech2",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fastspeech2/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fastspeech2/resolve/main/fastspeech_hifigan_en.onnx",
        "primaryDownloadLabel": "fastspeech_hifigan_en.om",
        "downloads": [
            {
                "title": "fastspeech_hifigan_en.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fastspeech2/resolve/main/fastspeech_hifigan_en.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "fastspeech_hifigan_en.onnx"
            },
            {
                "title": "fastspeech_hifigan_en.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fastspeech2/resolve/main/fastspeech_hifigan_en.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "fastspeech_hifigan_en.onnx"
            },
            {
                "title": "fastspeech_hifigan_en.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-fastspeech2/resolve/main/fastspeech_hifigan_en.onnx",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": "fastspeech_hifigan_en.onnx"
            }
        ]
    },
    {
        "id": "ib6scq68vs00",
        "name": "CodeFormer",
        "description": "CodeFormer 是一种基于码本查找 Transformer 的鲁棒盲人脸修复模型。相比传统方法，它通过生成对抗网络与量化编码技术，能有效处理模糊、噪声等多种退化问题，兼顾人脸修复质量与身份保真度，适用于盲人脸恢复场景。",
        "date": "2025-12-30 17:56:29",
        "updatedAt": "2025-12-30 20:02:18",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "图像增强"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1720510897520642%2Fcodeformer.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1720510897520642%2Fcodeformer.jpg",
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
                "content": "CodeFormer模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // CodeFormer模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::CodeFormer) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/super_resolution/CodeFormer/src/CMakeLists.txt)"
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
        "primaryDownloadLabel": "空文件，因为该模型仅用于非商用.om",
        "downloads": [
            {
                "title": "空文件，因为该模型仅用于非商用.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-codeformer/resolve/main/%E7%A9%BA%E6%96%87%E4%BB%B6%EF%BC%8C%E5%9B%A0%E4%B8%BA%E8%AF%A5%E6%A8%A1%E5%9E%8B%E4%BB%85%E7%94%A8%E4%BA%8E%E9%9D%9E%E5%95%86%E7%94%A8.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "空文件，因为该模型仅用于非商用.onnx"
            },
            {
                "title": "空文件，因为该模型仅用于非商用.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-codeformer/resolve/main/%E7%A9%BA%E6%96%87%E4%BB%B6%EF%BC%8C%E5%9B%A0%E4%B8%BA%E8%AF%A5%E6%A8%A1%E5%9E%8B%E4%BB%85%E7%94%A8%E4%BA%8E%E9%9D%9E%E5%95%86%E7%94%A8.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "空文件，因为该模型仅用于非商用.onnx"
            },
            {
                "title": "空文件，因为该模型仅用于非商用.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-codeformer/resolve/main/%E7%A9%BA%E6%96%87%E4%BB%B6%EF%BC%8C%E5%9B%A0%E4%B8%BA%E8%AF%A5%E6%A8%A1%E5%9E%8B%E4%BB%85%E7%94%A8%E4%BA%8E%E9%9D%9E%E5%95%86%E7%94%A8.onnx",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": "空文件，因为该模型仅用于非商用.onnx"
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-codeformer/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "iapedo790s00",
        "name": "FaceNet",
        "description": "FaceNet 是一种基于深度卷积神经网络的端到端人脸识别与特征嵌入模型。相比传统基于手工特征或分阶段匹配的方法，它通过将人脸图像直接映射为固定维度的紧凑特征向量（Embedding），并采用三元组损失（Triplet Loss）优化特征相似度度量，能有效缩小类内差异、扩大类间距离，兼顾识别精度与推理效率，适用于身份验证、人脸检索、监控安防等大规模人脸识别场景。",
        "date": "2025-12-29 10:37:55",
        "updatedAt": "2025-12-30 20:02:17",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "人脸识别"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1720278245769217%2Ffacenet1.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1720278245769217%2Ffacenet1.jpg",
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
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::FaceNet) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/recognition/FaceNet/src/CMakeLists.txt)。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-facenet/resolve/main/facenet_vggface2_static.onnx",
        "primaryDownloadLabel": "facenet_vggface2_static.onnx",
        "downloads": [
            {
                "title": "facenet_vggface2_static.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-facenet/resolve/main/facenet_vggface2_static.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "facenet_vggface2_static.onnx"
            },
            {
                "title": "facenet_vggface2_static.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-facenet/resolve/main/facenet_vggface2_static.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "facenet_vggface2_static.onnx"
            },
            {
                "title": "facenet_vggface2_dpico.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": null
            },
            {
                "title": "facenet_vggface2_dlite_fp16.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "f16",
                "localFile": null
            },
            {
                "title": "lfw.tgz",
                "href": "http://vis-www.cs.umass.edu/lfw/lfw.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-facenet/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9urm5td6k00",
        "name": "LRStereo-B",
        "description": "LRStereo-B是一个轻量且鲁棒的双目立体匹配模型。它在开源模型(Raft-Stereo)的基础上做了大量的模型结构改进和重训。具体功能为输入标定好的左右目图像以及相关的相机参数，获得左目图像对应的深度图。",
        "date": "2025-12-26 20:41:00",
        "updatedAt": "2025-12-30 20:02:17",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "双目深度"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719806466260993%2Fdepth.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719806466260993%2Fdepth.jpg",
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
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n  EnvInit();\n  std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n  std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n  std::string omModelDisPath = \"/path/to/model.om\"; // 视差转距离模型文件路径 \n  bool type = std::stoi(cfg[\"type\"]) == 1; // 是否使用视差转距离模型\n  std::unique_ptr<Model> modelStereo = std::make_unique<Model>();\n  modelStereo->Load(omModelPath, LRStereo)\n  std::unique_ptr<Model> modelDis = std::make_unique<Model>();\n  if (type && modelDis->Load(dis_path, LRStereoDis) != 0) {\n    LOG(ERROR) << \"fail to load Dis model\";\n    return 0;\n  }\n  std::vector<std::vector<std::string>> fileLists = ParseFileList(imagePath);\n  std::vector<std::vector<Tensor>> ret;\n  std::vector<Tensor> result;\n  for (size_t i = 0; i < fileLists.size(); ++i) {\n    std::string inputString = BuildInputString(fileLists[i]);\n    ret = modelStereo->Infer(inputString, FileType::SingelImageFile);\n    if (type) {\n      result = modelDis->Infer(ret[0], inputString);\n    }\n  }\n  ret.clear();\n  ret.shrink_to_fit();\n  modelStereo->Unload()\n  if (type) {\n    result.clear();\n    result.shrink_to_fit();\n    modelDis->Unload() != 0\n  }\n  EnvDeinit();\n  return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于[/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)]目录下，编译相关配置参考[CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/depth/LiteAndRobustStereo/src/CMakeLists.txt)]"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-lrstereo-b/resolve/main/LRStereo-B.zip",
        "primaryDownloadLabel": "LRStereo-B.zip",
        "downloads": [
            {
                "title": "LRStereo-B.zip",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-lrstereo-b/resolve/main/LRStereo-B.zip",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "LRStereo-B.zip"
            },
            {
                "title": "LRStereo-B.zip",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-lrstereo-b/resolve/main/LRStereo-B.zip",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "LRStereo-B.zip"
            },
            {
                "title": "LRStereo-B_480x640_release.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-lrstereo-b/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9t43v4pec00",
        "name": "TinySam",
        "description": "TinySAM 通过全阶段知识蒸馏、在线硬提示采样、量化等系列优化策略，构建轻量级 “万物分割” 模型，解决了原始 SAM 模型计算量大、部署困难的痛点，助力高效分割任务在资源受限场景下的应用。",
        "date": "2025-12-26 16:38:13",
        "updatedAt": "2025-12-30 20:02:17",
        "badge": "Beta",
        "betaVersionDesc": "模型性能待优化",
        "category": "计算机视觉",
        "tags": [
            "分割"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719774851694593%2Frealquant_201909262051154_0.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719774851694593%2Frealquant_201909262051154_0.jpg",
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
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/segmentation/TinySam",
        "licenseUrl": "https://github.com/xinghaochen/TinySAM/blob/main/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/segmentation/TinySam/",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "TinySam模型可以通过以下代码完成快速推理\n#include \"sam_predictor.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    SAMBoxPredictor predictor;\n    predictor.loadModel(modelPaths);\n    predictor.setImage(image); // 编码图像数据\n    predictor.predict(boxes);  // 设置检测框进行分割模型掩码解码\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/segmentation/TinySam/src/CMakeLists.txt)。"
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
        "originModels": [
            {
                "name": "prompt_encoder_deploy_model.onnx",
                "size": "5.3 KB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/prompt_encoder_deploy_model.onnx",
                "available": true,
                "localFile": "prompt_encoder_deploy_model.onnx"
            },
            {
                "name": "image_encoder_deploy_model.onnx",
                "size": "10.3 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/image_encoder_deploy_model.onnx",
                "available": true,
                "localFile": "image_encoder_deploy_model.onnx"
            },
            {
                "name": "tinysam.pth",
                "size": "38.8 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/tinysam.pth",
                "available": true,
                "localFile": "tinysam.pth"
            },
            {
                "name": "mask_decoder_deploy_model.onnx",
                "size": "4.7 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/mask_decoder_deploy_model.onnx",
                "available": true,
                "localFile": "mask_decoder_deploy_model.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-tinysam",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/prompt_encoder_deploy_model.onnx",
        "primaryDownloadLabel": "prompt_encoder_deploy_model.onnx",
        "downloads": [
            {
                "title": "prompt_encoder_deploy_model.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/prompt_encoder_deploy_model.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "prompt_encoder_deploy_model.onnx"
            },
            {
                "title": "image_encoder_deploy_model.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/image_encoder_deploy_model.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "image_encoder_deploy_model.onnx"
            },
            {
                "title": "tinysam.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/tinysam.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "tinysam.pth"
            },
            {
                "title": "mask_decoder_deploy_model.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/mask_decoder_deploy_model.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "mask_decoder_deploy_model.onnx"
            },
            {
                "title": "prompt_encoder_deploy_model.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/prompt_encoder_deploy_model.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "prompt_encoder_deploy_model.onnx"
            },
            {
                "title": "image_encoder_deploy_model.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/image_encoder_deploy_model.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "image_encoder_deploy_model.onnx"
            },
            {
                "title": "tinysam.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/tinysam.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "tinysam.pth"
            },
            {
                "title": "mask_decoder_deploy_model.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/mask_decoder_deploy_model.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "mask_decoder_deploy_model.onnx"
            },
            {
                "title": "tinysam改后缀为zip解压后使用.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-tinysam/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9t0hkf56k00",
        "name": "YOLOv8s-OBB",
        "description": "YOLOv8s-OBB 是 Ultralytics 推出的基于 YOLOv8 的旋转目标检测（Oriented Bounding Box, OBB）模型。相比于水平框检测，OBB 能够更准确地检测倾斜或不规则排列的目标（如航拍图像中的车辆、船只等）。该模型在 DOTA 数据集上进行了训练和验证。",
        "date": "2025-12-26 16:22:36",
        "updatedAt": "2025-12-30 20:02:17",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719773337550850%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20251226161015.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719773337550850%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20251226161015.jpg",
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
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\nusing namespace Infer;\nint main()\n{\n  EnvInit();\n  std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n  std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n  std::unique_ptr<Model> model = std::make_unique<Model>();\n  if (model->Load(omModelPath, ModelType::Yolov8sObb) != 0) {\n    LOG(ERROR) << \"fail to load model\";\n    return -1;\n  }\n  auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n  if (ret.size() == 0) {\n    LOG(ERROR) << \"fail to infer model\";\n    model->Unload();\n    return -1;\n  }\n  if (model->Unload() != 0) {\n    LOG(ERROR) << \"fail to unload model\";\n    return -1;\n  }\n  EnvDeinit();\n  return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于[/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)]目录下，编译相关配置参考[CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov8s-obb/src/CMakeLists.txt)]"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-obb/resolve/main/yolov8s-obb.onnx",
        "primaryDownloadLabel": "yolov8s-obb.om",
        "downloads": [
            {
                "title": "yolov8s-obb.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-obb/resolve/main/yolov8s-obb.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "yolov8s-obb.onnx"
            },
            {
                "title": "yolov8s-obb.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-obb/resolve/main/yolov8s-obb.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov8s-obb.onnx"
            },
            {
                "title": "yolov8s-obb.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-obb/resolve/main/yolov8s-obb.onnx",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": "yolov8s-obb.onnx"
            },
            {
                "title": "yolov8s_obb.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "f16",
                "localFile": null
            },
            {
                "title": "DOTAv1.zip",
                "href": "https://github.com/ultralytics/assets/releases/download/v0.0.0/DOTAv1.zip",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-obb/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9srr6dd6k00",
        "name": "PaddleOCRv4-rec",
        "description": "PP-OCRv4识别模型在PP-OCRv3的基础上进一步升级。整体的框架保持了与PP-OCRv3识别模型相同的pipeline，分别进行了数据、网络结构、训练策略等方面的优化。",
        "date": "2025-12-26 16:02:03",
        "updatedAt": "2025-12-30 20:02:17",
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 SVP_NNN引擎上模型性能待优化",
        "category": "计算机视觉",
        "tags": [
            "OCR"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719966200037379%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20251227174303.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719966200037379%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20251227174303.png",
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
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/ocr/PaddleOCRv4-rec",
        "licenseUrl": "https://github.com/PaddlePaddle/PaddleOCR/blob/release/2.10/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/ocr/PaddleOCRv4-rec/",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "PaddleOCRv4-rec模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n  EnvInit();\n  std::string omModelPath = \"/path/to/model.om\"; // PaddleOCRv4-rec模型文件路径 \n  std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n  std::unique_ptr<Model> model = std::make_unique<Model>();\n  if (model->Load(omModelPath, ModelType::PaddleOCR_Rec) != 0) {\n    LOG(ERROR) << \"fail to load model\";\n    return -1;\n  }\n  auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n  if (ret.size() == 0) {\n    LOG(ERROR) << \"fail to infer model\";\n    model->Unload();\n    return -1;\n  }\n  if (model->Unload() != 0) {\n    LOG(ERROR) << \"fail to unload model\";\n    return -1;\n  }\n  EnvDeinit();\n  return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于[/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)]目录下，编译相关配置参考[CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/ocr/PaddleOCRv4-rec/src/CMakeLists.txt)]。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-rec/resolve/main/ch_ptocr_v4_rec_infer.pth",
        "primaryDownloadLabel": "ch_ptocr_v4_rec_infer.pth",
        "downloads": [
            {
                "title": "ch_ptocr_v4_rec_infer.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-rec/resolve/main/ch_ptocr_v4_rec_infer.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "ch_ptocr_v4_rec_simplified.onnx"
            },
            {
                "title": "ch_ptocr_v4_rec_infer.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-rec/resolve/main/ch_ptocr_v4_rec_infer.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "ch_ptocr_v4_rec_infer.pth"
            },
            {
                "title": "ch_ptocr_v4_rec_simplified.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-rec/resolve/main/ch_ptocr_v4_rec_simplified.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "ch_ptocr_v4_rec_simplified.onnx"
            },
            {
                "title": "rec.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-rec/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9sq1n0lec00",
        "name": "PaddleOCRv4-det",
        "description": "PP-OCRv4检测模型在PP-OCRv3检测模型的基础上，在网络结构，训练策略，蒸馏策略三个方面做了优化。首先，PP-OCRv4检测模型使用PP-LCNetV3替换MobileNetv3，并提出并行分支融合的PFhead结构；其次，训练时动态调整shrink ratio的比例；最后，PP-OCRv4对CML的蒸馏loss进行优化，进一步提升文字检测效果。",
        "date": "2025-12-26 15:54:13",
        "updatedAt": "2025-12-30 20:02:17",
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 SVP_NNN引擎上模型性能待优化",
        "category": "计算机视觉",
        "tags": [
            "OCR"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719770449772547%2Focr.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719770449772547%2Focr.jpg",
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
                "content": "PaddleOCRv4-det模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // PaddleOCRv4-det模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::PaddleOCR_Det) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于[/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)]目录下，编译相关配置参考[CMakeLists.txt (https://gitee.com/HiSpark/modelzoo-dev/tree/master/samples/samples_GPL/built-in/yolov3/src/CMakeLists.txt)]。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-det/resolve/main/ch_ptocr_v4_det_infer.pth",
        "primaryDownloadLabel": "ch_ptocr_v4_det_infer.pth",
        "downloads": [
            {
                "title": "ch_ptocr_v4_det_infer.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-det/resolve/main/ch_ptocr_v4_det_infer.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "ch_ptocr_v4_det_simplified.onnx"
            },
            {
                "title": "ch_ptocr_v4_det_infer.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-det/resolve/main/ch_ptocr_v4_det_infer.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "ch_ptocr_v4_det_infer.pth"
            },
            {
                "title": "ch_ptocr_v4_det_simplified.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-det/resolve/main/ch_ptocr_v4_det_simplified.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "ch_ptocr_v4_det_simplified.onnx"
            },
            {
                "title": "det.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-paddleocrv4-det/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9snjr85ec00",
        "name": "YOLOv3",
        "description": "YOLOv3是一种端到端的one-stage目标检测模型。相比YOLOv2，YOLOv3采用了一个新的backbone-Darknet-53来进行特征提取工作，这个新网络比Darknet-19更加强大，也比ResNet-101或者ResNet-152更加高效。",
        "date": "2025-12-26 15:43:35",
        "updatedAt": "2025-12-30 20:02:17",
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 SVP_NNN引擎上模型性能待进一步优化",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1712022653894659%2Fom.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1712022653894659%2Fom.jpg",
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
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n  EnvInit();\n  std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n  std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n  std::unique_ptr<Model> model = std::make_unique<Model>();\n  if (model->Load(omModelPath, ModelType::Yolov3) != 0) {\n    LOG(ERROR) << \"fail to load model\";\n    return -1;\n  }\n  auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n  if (ret.size() == 0) {\n    LOG(ERROR) << \"fail to infer model\";\n    model->Unload();\n    return -1;\n  }\n  if (model->Unload() != 0) {\n    LOG(ERROR) << \"fail to unload model\";\n    return -1;\n  }\n  EnvDeinit();\n  return 0;\n}\n\n备注：上述C++代码依赖的动态库与头文件位于[/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)]目录下，编译相关配置参考[CMakeLists.txt (https://gitee.com/HiSpark/modelzoo-dev/tree/master/samples/samples_GPL/built-in/yolov3/src/CMakeLists.txt)]。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3/resolve/main/yolov3.pt",
        "primaryDownloadLabel": "yolov3.pt",
        "downloads": [
            {
                "title": "yolov3.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3/resolve/main/yolov3.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "yolov3.onnx"
            },
            {
                "title": "yolov3.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3/resolve/main/yolov3.pt",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov3.pt"
            },
            {
                "title": "yolov3_sim.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3/resolve/main/yolov3_sim.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov3_sim.onnx"
            },
            {
                "title": "yolov3.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3/resolve/main/yolov3.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov3.onnx"
            },
            {
                "title": "yolov3.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov3/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9sgeqqt6k00",
        "name": "YOLOv10s",
        "description": "YOLOv10 引入了一种新的实时目标检测方法，解决了以前YOLO 版本在后处理和模型架构方面的不足。通过消除非最大抑制NMS和优化各种模型组件，YOLOv10 显著降低了计算开销。本示例基于YOLOv10s。",
        "date": "2025-12-26 15:12:19",
        "updatedAt": "2025-12-30 20:02:17",
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 SVP_NNN引擎上模型性能进一步优化中",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719767893344257%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20251226152658.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719767893344257%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20251226152658.png",
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
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov10s",
        "licenseUrl": "https://github.com/THU-MIG/yolov10/blob/v1.1/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/samples_GPL/built-in/yolov10s",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "YOLOv10s模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n  EnvInit();\n  std::string omModelPath = \"/path/to/model.om\"; // YOLOv10s模型文件路径 \n  std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n  std::unique_ptr<Model> model = std::make_unique<Model>();\n  if (model->Load(omModelPath, ModelType::Yolov10s) != 0) {\n    LOG(ERROR) << \"fail to load model\";\n    return -1;\n  }\n  auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n  if (ret.size() == 0) {\n    LOG(ERROR) << \"fail to infer model\";\n    model->Unload();\n    return -1;\n  }\n  if (model->Unload() != 0) {\n    LOG(ERROR) << \"fail to unload model\";\n    return -1;\n  }\n  EnvDeinit();\n  return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于[/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)]目录下，编译相关配置参考[CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov10s/src/CMakeLists.txt)]。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov10s/resolve/main/yolov10s.onnx",
        "primaryDownloadLabel": "yolov10s.onnx",
        "downloads": [
            {
                "title": "yolov10s.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov10s/resolve/main/yolov10s.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "yolov10s.pt"
            },
            {
                "title": "yolov10s.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov10s/resolve/main/yolov10s.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov10s.onnx"
            },
            {
                "title": "yolov10s.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov10s/resolve/main/yolov10s.pt",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov10s.pt"
            },
            {
                "title": "yolov10s.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov10s/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9qdl2hh6k00",
        "name": "HRNet",
        "description": "HigherHRNet 是一种新型的自下而上人体姿态估计算法，它在训练阶段引入多分辨率监督机制，在推理阶段采用多分辨率聚合策略，不仅能有效应对自下而上多人姿态估计任务中的尺度变化难题，还可实现关键点的高精度定位，尤其在小尺寸人体目标的处理上表现突出。",
        "date": "2025-12-26 10:20:26",
        "updatedAt": "2025-12-30 20:02:17",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "姿态估计"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719728246685699%2Fresult_valid_0.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719728246685699%2Fresult_valid_0.jpg",
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
                "content": "HRNet模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // HRNet模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::HRNet) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common) 目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/pose/HRNet/src/CMakeLists.txt) 。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-hrnet/resolve/main/hrnet_512_768.onnx",
        "primaryDownloadLabel": "hrnet_512_768.om",
        "downloads": [
            {
                "title": "pose_higher_hrnet_w32_512.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-hrnet/resolve/main/pose_higher_hrnet_w32_512.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "hrnet_512_768.onnx"
            },
            {
                "title": "pose_higher_hrnet_w32_512.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-hrnet/resolve/main/pose_higher_hrnet_w32_512.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "pose_higher_hrnet_w32_512.pth"
            },
            {
                "title": "hrnet_512_768.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-hrnet/resolve/main/hrnet_512_768.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "hrnet_512_768.onnx"
            },
            {
                "title": "hrnet_512_768.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-hrnet/resolve/main/hrnet_512_768.onnx",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": "hrnet_512_768.onnx"
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-hrnet/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9q7jrn16k00",
        "name": "YOLO11s",
        "description": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLO11网络模型是YOLO系列的最新版本，在继承了原有YOLO网络模型优点的基础上，在架构和训练方法上进行了重大改进，具有更高的检测精度、速度和效率",
        "date": "2025-12-26 09:54:03",
        "updatedAt": "2025-12-30 20:02:18",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701337666486274%2Fyolo11s.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701337666486274%2Fyolo11s.jpg",
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
                "content": "模型可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main(int argc, char *argv[])\n{\n    InferParam inferParam;\n    ParseCmd(argc, argv, inferParam)\n    DevInit(inferParam.aclConfigPath);\n    ModelInfer(inferParam);\n    Infer::DevDeInit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolo11s/src/CMakeLists.txt)"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s/resolve/main/yolo11s.pt",
        "primaryDownloadLabel": "yolo11s.pt",
        "downloads": [
            {
                "title": "yolo11s.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s/resolve/main/yolo11s.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "yolo11s.onnx"
            },
            {
                "title": "yolo11s.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s/resolve/main/yolo11s.pt",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolo11s.pt"
            },
            {
                "title": "yolo11s.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s/resolve/main/yolo11s.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolo11s.onnx"
            },
            {
                "title": "yolo11s.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9q65e4hec00",
        "name": "YOLOv8s",
        "description": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLOv8在之前的YOLO版本的基础上进行了改进，在继承了原有YOLO网络模型优点的基础上，引入了新的特效和优化，具有更高的检测精度。",
        "date": "2025-12-26 09:47:43",
        "updatedAt": "2025-12-30 20:02:17",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701430205546498%2Fyolov8s.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701430205546498%2Fyolov8s.jpg",
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
                "content": "模型 可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main(int argc, char *argv[])\n{\n    InferParam inferParam;\n    ParseCmd(argc, argv, inferParam)\n    DevInit(inferParam.aclConfigPath);\n    ModelInfer(inferParam);\n    Infer::DevDeInit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov8s/src/CMakeLists.txt)"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s/resolve/main/yolov8s.pt",
        "primaryDownloadLabel": "yolov8s.pt",
        "downloads": [
            {
                "title": "yolov8s.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s/resolve/main/yolov8s.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "yolov8s.onnx"
            },
            {
                "title": "yolov8s.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s/resolve/main/yolov8s.pt",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov8s.pt"
            },
            {
                "title": "yolov8s.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s/resolve/main/yolov8s.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov8s.onnx"
            },
            {
                "title": "yolov8s.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9kll1a96k00",
        "name": "VDSR",
        "description": "VDSR（Very Deep Super-Resolution Network）是一种20层深度卷积神经网络，通过残差学习实现图像超分辨率重建。",
        "date": "2025-12-25 20:56:31",
        "updatedAt": "2025-12-30 20:02:18",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "图像超分"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719627344314369%2FVDSRdemo.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719627344314369%2FVDSRdemo.png",
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
                "content": "VDSR模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // VDSR模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::VDSR) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/super_resolution/VDSR/src/CMakeLists.txt)"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vdsr/resolve/main/vdsr.zip",
        "primaryDownloadLabel": "vdsr.om",
        "downloads": [
            {
                "title": "vdsr.zip",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vdsr/resolve/main/vdsr.zip",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "vdsr.zip"
            },
            {
                "title": "vdsr.zip",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vdsr/resolve/main/vdsr.zip",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "vdsr.zip"
            },
            {
                "title": "vdsr.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vdsr/resolve/main/vdsr.zip",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": "vdsr.zip"
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vdsr/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9kei1td6k00",
        "name": "Siamese Network",
        "description": "Siamese Network(孪生神经网络)是一种通过共享权重的两个相同子网络来度量两个输入样本相似性的深度学习框架，广泛应用于人脸识别、签名验证等任务。",
        "date": "2025-12-25 20:25:32",
        "updatedAt": null,
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 SVP_NNN 和 NNN 引擎上模型性能待进一步优化",
        "category": "计算机视觉",
        "tags": [
            "人脸识别"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719623508623362%2FSiameseNetwork.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719623508623362%2FSiameseNetwork.png",
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
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/recognition/SiameseNetwork/doc/快速开始.md/",
        "licenseUrl": "https://github.com/harveyslash/Facial-Similarity-with-Siamese-Networks-in-Pytorch/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/recognition/SiameseNetwork",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // SiameseNetwork模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::SiameseNetwork) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/recognition/SiameseNetwork/src/CMakeLists.txt)"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-siamese-network/resolve/main/siamese_model_weights.pt",
        "primaryDownloadLabel": "siamese_model_weights.pt",
        "downloads": [
            {
                "title": "siamese_model_weights.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-siamese-network/resolve/main/siamese_model_weights.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "siamese_model_weights.pt"
            },
            {
                "title": "siamese_model_weights.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-siamese-network/resolve/main/siamese_model_weights.pt",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "siamese_model_weights.pt"
            },
            {
                "title": "siamese_network.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-siamese-network/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9j5c2fl6k00",
        "name": "YOLO11s-seg",
        "description": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLO11网络模型是YOLO系列的最新版本，在继承了原有YOLO网络模型优点的基础上，在架构和训练方法上进行了重大改进，具有更高的检测精度、速度和效率。YOLO11s-seg作为实例分割的模型，比检测模型更进一步，包括识别图像中的各个对象并将它们与图像的其余部分分割开来。",
        "date": "2025-12-25 17:25:35",
        "updatedAt": "2025-12-30 20:02:18",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701430507536385%2Fyolo11s-seg.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701430507536385%2Fyolo11s-seg.jpg",
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
                "content": "模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // yolo11s-seg模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::Yolo11s-seg) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolo11s-seg/src/CMakeLists.txt)。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-seg/resolve/main/yolo11s-seg.pt",
        "primaryDownloadLabel": "yolo11s-seg.pt",
        "downloads": [
            {
                "title": "yolo11s-seg.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-seg/resolve/main/yolo11s-seg.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "yolo11s-seg.onnx"
            },
            {
                "title": "yolo11s-seg.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-seg/resolve/main/yolo11s-seg.pt",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolo11s-seg.pt"
            },
            {
                "title": "yolo11s-seg.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-seg/resolve/main/yolo11s-seg.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolo11s-seg.onnx"
            },
            {
                "title": "yolo11s-seg.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": null
            },
            {
                "title": "yolo11s-seg_dlite_fp16.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "f16",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-seg/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9j3k8rpec00",
        "name": "YOLO11s-pose",
        "description": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLO11网络模型是YOLO系列的最新版本，在继承了原有YOLO网络模型优点的基础上，在架构和训练方法上进行了重大改进，具有更高的检测精度、速度和效率。YOLO11s-pose作为YOLO11的姿态估计的模型，能检测出代表人体不同部位的17个关键点。",
        "date": "2025-12-25 17:17:58",
        "updatedAt": "2025-12-30 20:02:18",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "姿态估计"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1712135222657026%2Fyolo11-pose-small.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1712135222657026%2Fyolo11-pose-small.jpg",
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
        "repositoryUrl": "https://gitee.com/Hispark/modelzoo/tree/master/samples/samples_GPL/built-in/yolo11s-pose",
        "licenseUrl": "https://github.com/ultralytics/ultralytics/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/Hispark/modelzoo/tree/master/samples/samples_GPL/built-in/yolo11s-pose",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // yolo11s-pose模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::Yolo11s-pose) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolo11s-pose/src/CMakeLists.txt)。"
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
        "originModels": [
            {
                "name": "yolo11s-pose.pt",
                "size": "19.4 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-pose/resolve/main/yolo11s-pose.pt",
                "available": true,
                "localFile": "yolo11s-pose.pt"
            },
            {
                "name": "yolo11s-pose.onnx",
                "size": "38.1 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-pose/resolve/main/yolo11s-pose.onnx",
                "available": true,
                "localFile": "yolo11s-pose.onnx"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-yolo11s-pose",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-pose",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-pose/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-pose/resolve/main/yolo11s-pose.pt",
        "primaryDownloadLabel": "yolo11s-pose.pt",
        "downloads": [
            {
                "title": "yolo11s-pose.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-pose/resolve/main/yolo11s-pose.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "yolo11s-pose.pt"
            },
            {
                "title": "yolo11s-pose.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-pose/resolve/main/yolo11s-pose.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "yolo11s-pose.onnx"
            },
            {
                "title": "yolo11s-pose.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-pose/resolve/main/yolo11s-pose.pt",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolo11s-pose.pt"
            },
            {
                "title": "yolo11s-pose.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-pose/resolve/main/yolo11s-pose.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolo11s-pose.onnx"
            },
            {
                "title": "yolo11s-pose.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": null
            },
            {
                "title": "yolo11s-pose_dlite_fp16.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "f16",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolo11s-pose/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9j2lpl16k00",
        "name": "YOLOv6s",
        "description": "YOLOv6s 是一种轻量高效的 one-stage 目标检测模型。相比前代 YOLO 模型，YOLOv6s 采用了 EfficientRep 作为 backbone 和 Rep-PAN 作为颈部网络，兼顾了检测精度与推理速度，更适用于边缘计算场景。",
        "date": "2025-12-25 17:13:48",
        "updatedAt": "2025-12-30 20:02:18",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1712131718316033%2Fyolov6s.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1712131718316033%2Fyolov6s.jpg",
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
                "content": "模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // yolov6s模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, Infer::Yolov6s) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov6s/src/CMakeLists.txt)。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov6s/resolve/main/yolov6s.pt",
        "primaryDownloadLabel": "yolov6s.pt",
        "downloads": [
            {
                "title": "yolov6s.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov6s/resolve/main/yolov6s.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "yolov6s_opset11.onnx"
            },
            {
                "title": "yolov6s.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov6s/resolve/main/yolov6s.pt",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov6s.pt"
            },
            {
                "title": "yolov6s_opset11.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov6s/resolve/main/yolov6s_opset11.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov6s_opset11.onnx"
            },
            {
                "title": "yolov6s_dpico.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": null
            },
            {
                "title": "yolov6s_dlite_fp16.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "f16",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov6s/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9j1qkj1ec00",
        "name": "PFLD",
        "description": "PFLD全称A Practical Facial Landmark Detector是一个精度高，速度快，模型小的人脸关键点检测模型。",
        "date": "2025-12-25 17:10:06",
        "updatedAt": "2025-12-30 20:02:18",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "关键点检测"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701485360513025%2FPFLD.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701485360513025%2FPFLD.png",
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
                "content": "PFLD模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n     std::string aclConfigPath = \"/path/to/acl.cfg\"; // 输入acl的配置路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    ret = Infer::DevInit(aclConfigPath);\n    std::shared_ptr<Infer::MdlBase> model = Infer::MdlCreate();\n    ret = model->LoadModel(omModelPath);\n    std::vector<std::string> imglists;\n    ret = ReadImglistFile(imagePath, imglists);\n    std::vector<Infer::TensorBuf> inBufs, outBufs;\n    std::vector<Infer::TensorDesc> inDescs, outDescs;\n    Infer::TensorDesc desc;\n    size_t inputNum = model->GetInTensorNum();\n    size_t  outputNum = model->GetOutTensorNum();\n    for (size_t i = 0; i < inputNum; i++) {\n        model->GetInTensorDescByIdx(i, desc);\n        inDescs.push_back(desc);\n        inBufs.emplace_back(desc.defaultSize, desc.defaultStride);\n    }\n    for (size_t i = 0; i < outputNum; i++) {\n        model->GetOutTensorDescByIdx(i, desc);\n        outDescs.push_back(desc);\n        outBufs.emplace_back(desc.defaultSize, desc.defaultStride);\n    }\n    model->GetInTensorDescByIdx(0, desc);\n    for (size_t i = 0; i < imglists.size(); ++i) {\n        ret = ReadImgFileToBuf(imglists[i], desc, inBufs[0]);\n        for (size_t j = 0; j < loop; j++) {\n            ret = model->Execute(inBufs, outBufs);\n        }\n        (void)PostProcess(outBufs, outDescs, imglists[i]);\n    }\n    model->UnLoadModel();\n    Infer::DevDeInit();\n    return 0;\n}\n备注：上述C++代码仅展示了主要流程，详细实现请参考PFLD (https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/detection/PFLD)。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-pfld/resolve/main/pfld-sim.onnx",
        "primaryDownloadLabel": "pfld-sim.onnx",
        "downloads": [
            {
                "title": "pfld-sim.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-pfld/resolve/main/pfld-sim.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "pfld-sim.onnx"
            },
            {
                "title": "pfld-sim.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-pfld/resolve/main/pfld-sim.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "pfld-sim.onnx"
            },
            {
                "title": "pfld_dpico.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": null
            },
            {
                "title": "pfld_dlite_fp16.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "f16",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-pfld/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9ivuh3hec00",
        "name": "YOLOv4",
        "description": "YOLOv4 是一种高性能的 one-stage 目标检测模型。相比 YOLOv3，YOLOv4 采用了 CSPDarknet53 作为 backbone 进行特征提取，该网络结合了跨金字塔池化结构和路径聚合网络，在精度和速度上均有显著提升。",
        "date": "2025-12-25 17:01:53",
        "updatedAt": "2025-12-30 21:27:13",
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 NNN引擎上模型性能待进一步优化",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1712131749773315%2Fyolov4.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1712131749773315%2Fyolov4.jpg",
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
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/detection/yolov4",
        "licenseUrl": "https://github.com/Tianxiaomo/pytorch-YOLOv4/blob/master/License.txt",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/detection/yolov4",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // yolov4模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::yolov4) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/detection/yolov4/src/CMakeLists.txt)"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov4/resolve/main/yolov4.pth",
        "primaryDownloadLabel": "yolov4.pth",
        "downloads": [
            {
                "title": "yolov4.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov4/resolve/main/yolov4.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "yolov4.onnx"
            },
            {
                "title": "yolov4.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov4/resolve/main/yolov4.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov4.pth"
            },
            {
                "title": "yolov4.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov4/resolve/main/yolov4.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov4.onnx"
            },
            {
                "title": "yolov4_dpico.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": null
            },
            {
                "title": "yolov4_dlite_fp16.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "f16",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov4/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9iei09pec00",
        "name": "YOLOv8s-seg",
        "description": "YOLOv8s-seg 是一种轻量高效的 one-stage 实例分割模型。相比前代 YOLO 模型，YOLOv8s-seg 采用 C2f 作为 backbone 和 PAFPN 作为颈部网络，结合 “原型掩码 + 掩码系数” 的分割头设计，在保证实时推理速度的同时实现像素级实例分割，适用于轻量化边缘部署场景。",
        "date": "2025-12-25 15:45:54",
        "updatedAt": "2025-12-30 21:27:16",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分割"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719623665909762%2Fyolov8s-seg.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719623665909762%2Fyolov8s-seg.jpg",
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
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::Yolov8sSeg) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov8s-seg/src/CMakeLists.txt)。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-seg/resolve/main/yolov8s-seg.onnx",
        "primaryDownloadLabel": "yolov8s-seg.onnx",
        "downloads": [
            {
                "title": "yolov8s-seg.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-seg/resolve/main/yolov8s-seg.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "yolov8s-seg.onnx"
            },
            {
                "title": "yolov8s-seg.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-seg/resolve/main/yolov8s-seg.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov8s-seg.onnx"
            },
            {
                "title": "yolov8s-seg_dpico.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": null
            },
            {
                "title": "yolov8s-seg_dlite_fp16.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "fp16",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8s-seg/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i9i4tr9hec00",
        "name": "CrowdCount",
        "description": "CrowdCount是一种基于多尺度卷积神经网络（MSCNN）的高精度人群计数模型。相比传统多列 / 多网络方法，它通过单列网络中的多尺度特征块（MSB）与尺度自适应密度图回归技术，能有效应对透视畸变导致的人物尺度差异问题，兼顾计数精度与模型轻量化，适用于监控图像、公共场所等密集人群计数场景。",
        "date": "2025-12-25 15:03:50",
        "updatedAt": "2025-12-30 21:27:21",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "人群计数"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719967754027009%2Fcombined_plot.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1719967754027009%2Fcombined_plot.jpg",
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
                "content": "模型可以通过以下代码完成快速推理\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::CrowdCount) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/count/CrowdCount/src/CMakeLists.txt)。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crowdcount/resolve/main/mscnn_model.onnx",
        "primaryDownloadLabel": "mscnn_model.onnx",
        "downloads": [
            {
                "title": "mscnn_model.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crowdcount/resolve/main/mscnn_model.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "mscnn_model.onnx"
            },
            {
                "title": "mscnn_model.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crowdcount/resolve/main/mscnn_model.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "mscnn_model.onnx"
            },
            {
                "title": "mscnn_model_dpico.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": null
            },
            {
                "title": "mscnn_model_dlite.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "f16",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-crowdcount/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "i16b4pv8rc00",
        "name": "UNet",
        "description": "UNet是由FCN改进而来的图像分割模型，其网络结构像U型，分为特征提取部分和上采样特征融合部分。",
        "date": "2025-11-29 15:01:53",
        "updatedAt": "2025-11-29 18:03:49",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分割"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701484842647555%2F15_2307569255_huge.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701484842647555%2F15_2307569255_huge.jpg",
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
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/UNet",
        "licenseUrl": "https://github.com/milesial/Pytorch-UNet/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/UNet",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "UNet模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // UNet模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::Unet) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/UNet/src/CMakeLists.txt)。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet/resolve/main/UNet.pth",
        "primaryDownloadLabel": "UNet.pth",
        "downloads": [
            {
                "title": "UNet.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet/resolve/main/UNet.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "UNet_dynamic_sim.onnx"
            },
            {
                "title": "UNet.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet/resolve/main/UNet.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "UNet.pth"
            },
            {
                "title": "UNet_dynamic_bs.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet/resolve/main/UNet_dynamic_bs.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "UNet_dynamic_bs.onnx"
            },
            {
                "title": "UNet_dynamic_sim.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet/resolve/main/UNet_dynamic_sim.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "UNet_dynamic_sim.onnx"
            },
            {
                "title": "unet.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-unet/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "ht96f9b50o00",
        "name": "VGG16",
        "description": "VGGNet是牛津大学计算机视觉组（Visual Geometry Group）和Google DeepMind公司的研究员一起研发的深度卷积神经网络，它探索了卷积神经网络的深度与其性能之间的关系，通过反复堆叠3*3的小型卷积核和2*2的最大池化层，成功地构筑了16~19层深的卷积神经网络。VGGNet相比之前state-of-the-art的网络结构，错误率大幅下降，VGGNet论文中全部使用了3*3的小型卷积核和2*2的最大池化核，通过不断加深网络结构来提升性能。",
        "date": "2025-11-17 11:25:12",
        "updatedAt": "2025-11-29 14:49:58",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1712668134146051%2Fpanda1.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1712668134146051%2Fpanda1.jpg",
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
                "content": "VGG16模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // VGG16模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::VGG16) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/VGG16/src/CMakeLists.txt)。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vgg16/resolve/main/vgg16.onnx",
        "primaryDownloadLabel": "vgg16.om",
        "downloads": [
            {
                "title": "vgg16.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vgg16/resolve/main/vgg16.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "vgg16-397923af.pth"
            },
            {
                "title": "vgg16.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vgg16/resolve/main/vgg16.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "vgg16.onnx"
            },
            {
                "title": "vgg16-397923af.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vgg16/resolve/main/vgg16-397923af.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "vgg16-397923af.pth"
            },
            {
                "title": "vgg16.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vgg16/resolve/main/vgg16.onnx",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": "vgg16.onnx"
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-vgg16/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "hsd8o65p5c00",
        "name": "SE-ResNet50",
        "description": "SE-ResNet50是一种基于ResNet50架构的改进卷积神经网络，通过引入SE（Squeeze-and-Excitation）注意力模块，自适应校准通道特征响应，显著提升模型表达能力。",
        "date": "2025-11-14 18:20:28",
        "updatedAt": "2025-11-29 14:49:58",
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 SVP_NNN引擎上模型性能待进一步优化",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1712179080462337%2FSEResNet50.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1712179080462337%2FSEResNet50.png",
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
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/SEResNet50",
        "licenseUrl": "https://github.com/morning4346/Se_resnet50/blob/master/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/SEResNet50",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "SEResnet50模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // SEResnet50模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::SEResnet50) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/SEResnet50/src/CMakeLists.txt)"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-se-resnet50/resolve/main/seresnet50.onnx",
        "primaryDownloadLabel": "seresnet50.onnx",
        "downloads": [
            {
                "title": "seresnet50.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-se-resnet50/resolve/main/seresnet50.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "seresnet50.zip"
            },
            {
                "title": "seresnet50.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-se-resnet50/resolve/main/seresnet50.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "seresnet50.onnx"
            },
            {
                "title": "seresnet50.zip",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-se-resnet50/resolve/main/seresnet50.zip",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "seresnet50.zip"
            },
            {
                "title": "seresnet50.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-se-resnet50/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "hsd646tl0o00",
        "name": "InceptionV3",
        "description": "InceptionV3 是为图像分类任务设计的高效卷积神经网络，其核心创新是使用模块化的 Inception 结构（如分解卷积、辅助分类器）来在保持计算效率的同时提升特征提取能力，并在 ImageNet 等数据集上取得优异性能。",
        "date": "2025-11-14 18:09:00",
        "updatedAt": "2025-11-29 14:49:57",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1712176979116033%2FInceptionV3.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1712176979116033%2FInceptionV3.png",
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
                "content": "模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // InceptionV3模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::InceptionV3) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/InceptionV3/src/CMakeLists.txt)"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-inceptionv3/resolve/main/InceptionV3.onnx",
        "primaryDownloadLabel": "InceptionV3.onnx",
        "downloads": [
            {
                "title": "InceptionV3.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-inceptionv3/resolve/main/InceptionV3.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "Inceptionv3.zip"
            },
            {
                "title": "InceptionV3.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-inceptionv3/resolve/main/InceptionV3.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "InceptionV3.onnx"
            },
            {
                "title": "Inceptionv3.zip",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-inceptionv3/resolve/main/Inceptionv3.zip",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "Inceptionv3.zip"
            },
            {
                "title": "InceptionV3.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-inceptionv3/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "hs9rrefl5c00",
        "name": "YOLOv7",
        "description": "YOLOv7在速度与精度方面均超越现有已知目标检测器：在5-160 FPS范围内表现最优，并在GPU V100上以30+ FPS实现56.8% AP的最高精度。其YOLOv7-E6模型在V100上达到56 FPS和55.9% AP，相比基于Transformer的SWIN-L Cascade-Mask R-CNN（A100 9.2 FPS，53.9% AP）速度提升509%且精度提高2%；相较基于卷积的ConvNeXt-XL Cascade-Mask R-CNN（A100 8.6 FPS，55.2% AP）速度提升551%且精度提高0.7%。此外，YOLOv7在速度与精度上均优于YOLOR、YOLOX、YOLOv5等主流检测器，且仅使用MS COCO数据集从头训练，未借助任何预训练权重。",
        "date": "2025-11-14 10:24:41",
        "updatedAt": "2025-11-29 14:49:58",
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1712178182881282%2Ftest067_output.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1712178182881282%2Ftest067_output.jpg",
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
                "content": "模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // YOLOV7模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::YOLOV7) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov7/src/CMakeLists.txt)"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov7/resolve/main/yolov7.pt",
        "primaryDownloadLabel": "yolov7.pt",
        "downloads": [
            {
                "title": "yolov7.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov7/resolve/main/yolov7.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "yolov7.onnx"
            },
            {
                "title": "yolov7.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov7/resolve/main/yolov7.pt",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov7.pt"
            },
            {
                "title": "yolov7.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov7/resolve/main/yolov7.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov7.onnx"
            },
            {
                "title": "yolov7.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov7/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "hs4fr0150o00",
        "name": "EfficientNetV2",
        "description": "EfficientNetV2是一系列图像分类模型，与现有技术相比，其实现了更好的参数效率和更快的训练速度。基于EfficientNetV1，Efficient NetV2模型使用神经架构搜索（NAS）来联合优化模型大小和训练速度，并以更快的训练和推理速度进行扩展。",
        "date": "2025-11-13 21:53:09",
        "updatedAt": "2025-11-29 14:49:58",
        "badge": "Beta",
        "betaVersionDesc": "Hi3403V100 SVP_NNN引擎上模型性能待进一步优化",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1700943102148611%2Feff.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1700943102148611%2Feff.png",
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
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/EfficientNetV2",
        "licenseUrl": "https://github.com/huggingface/pytorch-image-models/blob/main/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/classification/EfficientNetV2",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "EfficientNetV2模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // EfficientNetV2模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::EfficientNet) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/EfficientNetV2/src/CMakeLists.txt)。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-efficientnetv2/resolve/main/vit_base_patch16_224.om",
        "primaryDownloadLabel": "vit_base_patch16_224.om",
        "downloads": [
            {
                "title": "efficientnetv2.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-efficientnetv2/resolve/main/efficientnetv2.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "efficientnetv2_t_agc-3620981a.pth"
            },
            {
                "title": "efficientnetv2.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-efficientnetv2/resolve/main/efficientnetv2.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "efficientnetv2.onnx"
            },
            {
                "title": "efficientnetv2_t_agc-3620981a.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-efficientnetv2/resolve/main/efficientnetv2_t_agc-3620981a.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "efficientnetv2_t_agc-3620981a.pth"
            },
            {
                "title": "efficientnetv2.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": null
            },
            {
                "title": "vit_base_patch16_224.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-efficientnetv2/resolve/main/vit_base_patch16_224.om",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "f16",
                "localFile": "vit_base_patch16_224.om"
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-efficientnetv2/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "hbcci1q1oc00",
        "name": "ResNet50",
        "description": "ResNet是残差网络(Residual Network)的缩写,该系列网络广泛用于目标分类等领域以及作为计算机视觉任务主干经典神经网络的一部分，典型的网络有ResNet50, ResNet101等。ResNet证明网络能够向更深（包含更多隐藏层）的方向发展。",
        "date": "2025-09-22 20:40:35",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1702593768259586%2Fres51.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1702593768259586%2Fres51.png",
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
                "content": "ResNet50模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // ResNet50模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::ResNet50) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/ResNet50/src/CMakeLists.txt)。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet50/resolve/main/resnet50.onnx",
        "primaryDownloadLabel": "resnet50.om",
        "downloads": [
            {
                "title": "resnet50-0676ba61.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet50/resolve/main/resnet50-0676ba61.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "resnet50.onnx"
            },
            {
                "title": "resnet50-0676ba61.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet50/resolve/main/resnet50-0676ba61.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "resnet50-0676ba61.pth"
            },
            {
                "title": "resnet50.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet50/resolve/main/resnet50.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "resnet50.onnx"
            },
            {
                "title": "resnet50.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet50/resolve/main/resnet50.onnx",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": "resnet50.onnx"
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet50/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "h9k2a5agkk00",
        "name": "ResNet18",
        "description": "ResNet是残差网络(Residual Network)的缩写,该系列网络广泛用于目标分类等领域以及作为计算机视觉任务主干经典神经网络的一部分，典型的网络有ResNet18, ResNet101等。ResNet证明网络能够向更深（包含更多隐藏层）的方向发展。",
        "date": "2025-09-17 09:26:27",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701602950053889%2Fres18.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701602950053889%2Fres18.png",
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
                "content": "ResNet18模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // ResNet18模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::ResNet18) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/ResNet18/src/CMakeLists.txt)。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet18/resolve/main/resnet18.onnx",
        "primaryDownloadLabel": "resnet18.om",
        "downloads": [
            {
                "title": "resnet18-f37072fd.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet18/resolve/main/resnet18-f37072fd.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "resnet18.onnx"
            },
            {
                "title": "resnet18-f37072fd.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet18/resolve/main/resnet18-f37072fd.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "resnet18-f37072fd.pth"
            },
            {
                "title": "resnet18.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet18/resolve/main/resnet18.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "resnet18.onnx"
            },
            {
                "title": "resnet18.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet18/resolve/main/resnet18.onnx",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": "resnet18.onnx"
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet18/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "h94sd5f0v800",
        "name": "YOLOv8l",
        "description": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLOv8l在之前的YOLO版本的基础上进行了改进，在继承了原有YOLO网络模型优点的基础上，引入了新的特效和优化，具有更高的检测精度。",
        "date": "2025-09-15 22:03:30",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "检测"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701422771011587%2Fyolov8l.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701422771011587%2Fyolov8l.jpg",
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
                "content": "yolov8l 可以通过以下代码完成快速推理, 该代码仅展示主要流程，完整实现参考src/main.cpp文件和readme\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main(int argc, char *argv[])\n{\n    InferParam inferParam;\n    ParseCmd(argc, argv, inferParam)\n    DevInit(inferParam.aclConfigPath);\n    ModelInfer(inferParam);\n    Infer::DevDeInit();\n    return 0;\n}\n备注：头文件和动态库位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译配置参考文件 (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov8l/src/CMakeLists.txt)"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8l/resolve/main/yolov8l.pt",
        "primaryDownloadLabel": "yolov8l.pt",
        "downloads": [
            {
                "title": "yolov8l.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8l/resolve/main/yolov8l.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "yolov8l.onnx"
            },
            {
                "title": "yolov8l.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8l/resolve/main/yolov8l.pt",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov8l.pt"
            },
            {
                "title": "yolov8l.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8l/resolve/main/yolov8l.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov8l.onnx"
            },
            {
                "title": "yolov8l.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov8l/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "h8eivmf56c00",
        "name": "ResNet101",
        "description": "ResNet是ImageNet竞赛中分类问题效果较好的网络，它引入了残差学习的概念，通过增加直连通道来保护信息的完整性，解决信息丢失、梯度消失、梯度爆炸等问题，让很深的网络也得以训练。ResNet有不同的网络层数，常用的有18-layer、34-layer、50-layer、101-layer、152-layer。",
        "date": "2025-09-13 18:06:31",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "分类"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1700943569813507%2Fres101.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1700943569813507%2Fres101.png",
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
                "content": "ResNet101模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // ResNet101模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::ResNet101) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/built-in/classification/ResNet101/src/CMakeLists.txt)。"
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
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet101/resolve/main/resnet101.onnx",
        "primaryDownloadLabel": "resnet101.om",
        "downloads": [
            {
                "title": "resnet101.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet101/resolve/main/resnet101.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "resnet101-63fe2227.pth"
            },
            {
                "title": "resnet101.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet101/resolve/main/resnet101.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "resnet101.onnx"
            },
            {
                "title": "resnet101-63fe2227.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet101/resolve/main/resnet101-63fe2227.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "resnet101-63fe2227.pth"
            },
            {
                "title": "resnet101.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet101/resolve/main/resnet101.onnx",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": "resnet101.onnx"
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-resnet101/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "h819tsfh6c00",
        "name": "Depth-Anything-v2",
        "description": "Depth Anything V2在细节和鲁棒性方面显著优于 [V1](https://github.com/LiheYoung/Depth-Anything)。与基于 SD 的模型相比，它具有更快的推理速度、更少的参数和更高的深度精度。本示例使用的是Depth-Anything-V2-Small",
        "date": "2025-09-12 11:09:24",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "单目深度"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1700942867267585%2Fdepth.png",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1700942867267585%2Fdepth.png",
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
        "repositoryUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/depth/Depth-Anything-v2",
        "licenseUrl": "https://github.com/DepthAnything/Depth-Anything-V2/blob/main/LICENSE",
        "quickStartUrl": "https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/depth/Depth-Anything-v2",
        "quickStartMarkdownUrl": null,
        "quickStartReadmes": [
            {
                "language": "C++",
                "content": "Depth-Anything-v2模型可以通过以下代码完成快速推理\n\nusing namespace Infer;\n\nint main()\n{\n    std::string modelPath = \"/path/to/imgModel.om\"; // 模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::string aclConfigPath = \"/path/to/acl.cfg\"; // 输入acl的配置路径\n    int ret;\n    ret = Infer::DevInit(aclConfigPath);\n    std::shared_ptr<Infer::MdlBase> model = Infer::MdlCreate();\n    ret = model->LoadModel(modelPath);\n    std::vector<std::string> imglists;\n    ret = ReadImglistFile(imagePath, imglists);\n    std::vector<Infer::TensorBuf> inBufs, outBufs;\n    std::vector<Infer::TensorDesc> inDescs, outDescs;\n    Infer::TensorDesc desc;\n    size_t inputNum = model->GetInTensorNum();\n    size_t  outputNum = model->GetOutTensorNum();\n    for (size_t i = 0; i < inputNum; i++) {\n        model->GetInTensorDescByIdx(i, desc);\n        inDescs.push_back(desc);\n        inBufs.emplace_back(desc.defaultSize, desc.defaultStride);\n    }\n    for (size_t i = 0; i < outputNum; i++) {\n        model->GetOutTensorDescByIdx(i, desc);\n        outDescs.push_back(desc);\n        outBufs.emplace_back(desc.defaultSize, desc.defaultStride);\n    }\n    model->GetInTensorDescByIdx(0, desc);\n    for (size_t i = 0; i < imglists.size(); ++i) {\n        ret = ReadImgFileToBuf(imglists[i], desc, inBufs[0]);\n        ret = model->Execute(inBufs, outBufs);\n        (void)PostProcess(outBufs, outDescs, imglists[i]);\n    }\n    model->UnLoadModel();\n    Infer::DevDeInit();\n    return 0;\n}\n备注：上述C++代码仅展示了主要流程，详细实现请参考Depth-Anything-v2 (https://gitee.com/HiSpark/modelzoo/tree/master/samples/built-in/depth/Depth-Anything-v2)。"
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
        "originModels": [
            {
                "name": "depth_anything_v2_vits.onnx",
                "size": "94.4 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/depth_anything_v2_vits.onnx",
                "available": true,
                "localFile": "depth_anything_v2_vits.onnx"
            },
            {
                "name": "depth_anything_v2_vits.pth",
                "size": "94.6 MB",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/depth_anything_v2_vits.pth",
                "available": true,
                "localFile": "depth_anything_v2_vits.pth"
            }
        ],
        "hfRepoId": "shadow-cann/hispark-modelzoo-depth-anything-v2",
        "hfRepoUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2",
        "hfReadmeUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/blob/main/README.md",
        "primaryDownloadUrl": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/depth_anything_v2_vits.onnx",
        "primaryDownloadLabel": "depth_anything_v2_vits.onnx",
        "downloads": [
            {
                "title": "depth_anything_v2_vits.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/depth_anything_v2_vits.onnx",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "depth_anything_v2_vits.onnx"
            },
            {
                "title": "depth_anything_v2_vits.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/depth_anything_v2_vits.pth",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
                "note": "",
                "localFile": "depth_anything_v2_vits.pth"
            },
            {
                "title": "depth_anything_v2_vits.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/depth_anything_v2_vits.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "depth_anything_v2_vits.onnx"
            },
            {
                "title": "depth_anything_v2_vits.pth",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/depth_anything_v2_vits.pth",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "depth_anything_v2_vits.pth"
            },
            {
                "title": "depth_anything.om",
                "href": null,
                "available": false,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a16w8",
                "localFile": null
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-depth-anything-v2/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
            }
        ]
    },
    {
        "id": "h6s908ugto00",
        "name": "YOLOv5s",
        "description": "YOLO系列网络模型是最为经典的one-stage算法，也是目前工业领域使用最多的目标检测网络，YOLOv5网络模型在继承了原有YOLO网络模型优点的基础上，具有更优的检测精度和更快的推理速度。本示例使用YOLOv5s。",
        "date": "2025-09-08 20:52:23",
        "updatedAt": null,
        "badge": null,
        "betaVersionDesc": "",
        "category": "计算机视觉",
        "tags": [
            "目标检测"
        ],
        "image": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701484647481346%2Fyolov5s.jpg",
        "coverImageUrl": "https://openxinhuo-board-image.obs.cn-east-3.myhuaweicloud.com/1701484647481346%2Fyolov5s.jpg",
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
                "content": "yolov5模型可以通过以下代码完成快速推理\n\n#include \"model.h\"\n#include \"log.h\"\n\nusing namespace Infer;\n\nint main()\n{\n    EnvInit();\n    std::string omModelPath = \"/path/to/model.om\"; // yolov5模型文件路径 \n    std::string imagePath = \"/path/to/image.jpg\"; // 输入图片路径\n    std::unique_ptr<Model> model = std::make_unique<Model>();\n    if (model->Load(omModelPath, ModelType::Yolov5) != 0) {\n        LOG(ERROR) << \"fail to load model\";\n        return -1;\n    }\n    auto ret = model->Infer(imagePath, FileType::SingelImageFile);\n    if (ret.size() == 0) {\n        LOG(ERROR) << \"fail to infer model\";\n        model->Unload();\n        return -1;\n    }\n    if (model->Unload() != 0) {\n        LOG(ERROR) << \"fail to unload model\";\n        return -1;\n    }\n    EnvDeinit();\n    return 0;\n}\n备注：上述C++代码依赖的动态库与头文件位于/samples/common (https://gitee.com/HiSpark/modelzoo/tree/master/samples/common)目录下，编译相关配置参考CMakeLists.txt (https://gitee.com/HiSpark/modelzoo/blob/master/samples/samples_GPL/built-in/yolov5/src/CMakeLists.txt)。"
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
                "title": "yolov5s.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov5s/resolve/main/yolov5s.pt",
                "available": true,
                "source": "source-model",
                "sourceLabel": "源模型下载",
                "group": "源模型",
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
                "note": "",
                "localFile": "yolov5s.onnx"
            },
            {
                "title": "yolov5s.pt",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov5s/resolve/main/yolov5s.pt",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov5s.pt"
            },
            {
                "title": "yolov5s.onnx",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov5s/resolve/main/yolov5s.onnx",
                "available": true,
                "source": "originModel",
                "sourceLabel": "源模型元数据",
                "group": "源模型",
                "note": "",
                "localFile": "yolov5s.onnx"
            },
            {
                "title": "yolov5s.om",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov5s/resolve/main/yolov5s.om",
                "available": true,
                "source": "omOfflineModel",
                "sourceLabel": "OM 元数据",
                "group": "编译模型",
                "note": "a8w8",
                "localFile": "yolov5s.om"
            },
            {
                "title": "SVP_NNN_PC_V1.0.6.0.tgz",
                "href": "https://hf-mirror.com/shadow-cann/hispark-modelzoo-yolov5s/resolve/main/SVP_NNN_PC_V1.0.6.0.tgz",
                "available": true,
                "source": "api-all",
                "sourceLabel": "附加资源",
                "group": "附加资源",
                "note": "",
                "localFile": "SVP_NNN_PC_V1.0.6.0.tgz"
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
