import { RegisterPage } from "@/pages/RegisterPage";
import { render } from "@testing-library/react";
import { beforeEach, describe } from "vitest";

describe('RegisterPage', () => {
    
    beforeEach(() => {
        render(<RegisterPage />)
    })
});