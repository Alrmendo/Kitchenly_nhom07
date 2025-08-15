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
    { id: "lettuce", label: "Rau cải", image: "/placeholder.svg?height=120&width=120" },
    { id: "tomato", label: "Cà chua", image: "/placeholder.svg?height=120&width=120" },
    { id: "eggs", label: "Trứng", image: "/placeholder.svg?height=120&width=120" },
    { id: "squid", label: "Mực", image: "/placeholder.svg?height=120&width=120" },
    { id: "chicken", label: "Gà", image: "/placeholder.svg?height=120&width=120" },
    { id: "meat", label: "Thịt", image: "/placeholder.svg?height=120&width=120" },
    { id: "butter", label: "Bơ", image: "/placeholder.svg?height=120&width=120" },
    { id: "peanuts", label: "Đậu nành", image: "/placeholder.svg?height=120&width=120" },
    { id: "chili", label: "Ớt chuông", image: "/placeholder.svg?height=120&width=120" },
    { id: "strawberry", label: "Dâu", image: "/placeholder.svg?height=120&width=120" },
    { id: "mango", label: "Xoài", image: "/placeholder.svg?height=120&width=120" },
    { id: "banana", label: "Chuối", image: "/placeholder.svg?height=120&width=120" },
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
            contentClassName={`${isModalOpen ? "overflow-y-hidden" : ""} relative`}
        >
            <SelectionGrid
                items={INGREDIENT_OPTIONS}
                selectedItems={data.ingredients}
                onSelectionChange={handleSelectionChange}
                multiSelect={true}
                columns={3}
            />

            {/* Custom Ingredients */}
            {data.customIngredients.length > 0 && (
                <div className="mt-6 space-y-2">
                    {data.customIngredients.map((ingredient: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-red-50 rounded-xl">
                            <span className="flex-1 text-sm text-gray-700">{ingredient}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveCustomIngredient(index)}
                                className="h-8 w-8 text-red-400 hover:text-red-600"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

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
                <Modal onClose={() => setModalOpen(false)}> {/* Close modal */}
                    <div className="p-2">
                        <h2 className="text-lg font-bold text-gray-800">
                            Thêm nguyên liệu
                        </h2>
                        <Input
                            value={newIngredient}
                            onChange={(e) => setNewIngredient(e.target.value)}
                            placeholder="Nhập tên nguyên liệu..."
                            className="mt-4 rounded-xl border-pink-200 focus:border-pink-400"
                        />
                        <Button
                            onClick={() => {
                                handleAddCustomIngredient()
                                setModalOpen(false) // Close modal after adding
                            }}
                            disabled={!newIngredient.trim()}
                            className="mt-4 w-full px-6 rounded-xl !bg-red-400 hover:!bg-red-500"
                        >
                            Thêm
                        </Button>
                    </div>
                </Modal>
            )}
        </OnboardingLayout>
    )
}
