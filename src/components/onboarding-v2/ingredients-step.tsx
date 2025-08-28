"use client"

import { useState } from "react"
import { OnboardingLayout } from "./onboarding-layout"
import { SelectionGrid } from "./selection-grid"
import { Button } from "@/components/ui/button"
import Input from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { Modal } from "@/components/ui/modal" // Assuming you have a reusable Modal component

interface IngredientsStepProps {
    data: any
    updateData: (field: string, value: any) => void
    nextStep: () => void
    prevStep: () => void
    skipStep: () => void
    isFirstStep: boolean
    progress: number
    currentStepData: any
}

const INGREDIENT_OPTIONS = [
    { id: "lettuce", label: "Rau cải", image: "https://cdn.tgdd.vn/2022/09/CookDish/cach-nhat-rau-cai-ngot-nhanh-dung-cach-avt-1200x676.jpg" },
    { id: "tomato", label: "Cà chua", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bright_red_tomato_and_cross_section02.jpg/1200px-Bright_red_tomato_and_cross_section02.jpg" },
    { id: "eggs", label: "Trứng", image: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2025/3/8/photo-1741408427825-17414084285131651116857.jpeg" },
    { id: "squid", label: "Mực", image: "https://bizweb.dktcdn.net/100/308/217/products/20220609-145740.jpg" },
    { id: "chicken", label: "Gà", image: "https://upload.wikimedia.org/wikipedia/commons/0/03/Junglefowl_on_tree.jpg" },
    { id: "meat", label: "Thịt", image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/D%C3%A9coupe_de_b%C5%93uf.jpg" },
    { id: "butter", label: "Bơ", image: "https://static.tuoitre.vn/tto/i/s626/2016/05/25/hinh-2-1464143777.jpg" },
    { id: "peanuts", label: "Đậu phộng", image: "https://www.vinmec.com/static/uploads/20210524_042253_027495_an_lac_nhieu_2_max_1800x1800_jpg_1f678407c4.jpg" },
    { id: "chili", label: "Ớt chuông", image: "https://nhatminhfoods.com/media/product/60-pepper.jpg" },
]

export const IngredientsStep = ({
    data,
    updateData,
    nextStep,
    prevStep,
    skipStep,
    isFirstStep,
    progress,
    currentStepData,
}: IngredientsStepProps) => {
    const [newIngredient, setNewIngredient] = useState("")
    const [isModalOpen, setModalOpen] = useState(false) // State for modal visibility
    const [extendedOptions, setExtendedOptions] = useState(INGREDIENT_OPTIONS)
    const [counter, setCounter] = useState(Math.round(INGREDIENT_OPTIONS.length % 3)) // State for counter
    console.log("Current Data:", counter)
    // Add custom ingredients to extendedOptions when modal closes
    const handleModalClose = () => {
        setModalOpen(false)
        // Only add new custom ingredients not already in extendedOptions
        const customToAdd = data.customIngredients.filter(
            (ing: string) =>
                !extendedOptions.some(opt => opt.label.toLowerCase() === ing.toLowerCase())
        )
        if (customToAdd.length > 0) {
            setExtendedOptions(prev =>
                prev.concat(
                    customToAdd.map((ing: string) => ({
                        id: ing.toLowerCase().replace(/\s+/g, "_"),
                        label: ing,
                        image: "/placeholder.svg?height=120&width=120"
                    }))
                )
            )
            
            setCounter(counter + customToAdd.length)
        }
        data.customIngredients = []
    }

    const handleSelectionChange = (selected: string[]) => {
        updateData("ingredients", selected)
    }

    const handleAddCustomIngredient = () => {
        if (newIngredient.trim()) {
            const updatedCustom = [...data.customIngredients, newIngredient.trim()]
            updateData("customIngredients", updatedCustom)
            setNewIngredient("")
        }
    }

    const handleRemoveCustomIngredient = (index: number) => {
        const updatedCustom = data.customIngredients.filter((_: string, i: number) => i !== index)
        updateData("customIngredients", updatedCustom)
    }

    return (
        <OnboardingLayout
            title={currentStepData.title}
            description={currentStepData.description}
            progress={progress}
            onBack={prevStep}
            onSkip={skipStep}
            onContinue={nextStep}
            canContinue={true}
            isFirstStep={isFirstStep}
            contentClassName={`${isModalOpen ? "overflow-y-hidden" : "overflow-y-auto"} relative flex flex-col justify-end`}
        >
            <SelectionGrid
                items={extendedOptions}
                selectedItems={data.ingredients}
                onSelectionChange={handleSelectionChange}
                multiSelect={true}
                columns={3}
                className="!h-[300px] overflow-y-auto"
            />

            {/* Add Custom Ingredient */}
            <div className="mt-6">
                {/* Button to open modal */}
                <button
                    className="w-full mt-4 text-red-400 text-sm font-medium"
                    onClick={() => setModalOpen(true)} // Open modal
                >
                    Thêm nguyên liệu +
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <Modal onClose={() => handleModalClose()}
                    counter={counter}>
                    <div className="pt-8 pb-4 py-12 bg-[#FFF9F9] rounded-2xl w-full flex flex-col items-center">
                        <div className="space-y-3">
                            {data.customIngredients.map((ingredient: string, index: number) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input
                                        value={ingredient}
                                        onChange={(e) => {
                                            const updated = [...data.customIngredients]
                                            updated[index] = e.target.value
                                            updateData("customIngredients", updated)
                                        }}
                                        placeholder="Nguyên liệu..."
                                        className="flex-1 !bg-[#ffe1e0] text-[#ee8d92] rounded-xl border-none focus:ring-0 !w-60"
                                    />
                                    <Button
                                        size="icon"
                                        onClick={() => handleRemoveCustomIngredient(index)}
                                        className="h-8 w-8 text-red-400 hover:text-red-600 !bg-[#ffe1e0] !rounded-full"
                                    >
                                        <Trash2 className="h-4 w-4" color="#ee8d92" />
                                    </Button>
                                </div>
                            ))}
                            <div className="flex items-center gap-2">
                                <Input
                                    value={newIngredient}
                                    onChange={(e) => setNewIngredient(e.target.value)}
                                    placeholder="Nguyên liệu..."
                                    className="flex-1 bg-[#FFE4EA] text-gray-700 rounded-xl border-none focus:ring-0 !w-60"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    disabled
                                    className="h-8 w-8 opacity-0 !bg-[#ffe4ea] !rounded-full"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <Button
                            onClick={() => {
                                handleAddCustomIngredient()
                            }}
                            disabled={!newIngredient.trim()}
                            className="mt-5 w-60 px-6 rounded-xl !bg-inherit !text-[#ee8d92] font-medium border border-[#ee8d92] !rounded-full"
                        >
                            Thêm nguyên liệu
                        </Button>
                    </div>
                </Modal>
            )}
        </OnboardingLayout>
    )
}
